// Global variables for polygon drawing and editing
let isPolygon = false; // Flag to indicate if drawing a polygon
let isEditing = false; // Flag to indicate if editing shapes
let editedPolygonObject = 0; // Index of the edited polygon object
let polyPoints = []; // Array to store points of the polygon being drawn
let editablePolygon; // Currently editable polygon
let editablePolygonPointIndex = []; // Indices of editable polygon points

// Event listeners for shape selection buttons
const lineButton = document.getElementById("line");
lineButton.addEventListener("click", function () {
  if (!isEditing) {
    alert("You can start drawing a line.");
    hideDrawPolyButtons();
    isPolygon = false;
    drawType = "line";
  } else {
    alert("Click the finish button first!");
  }
});

const squareButton = document.getElementById("square");
squareButton.addEventListener("click", function () {
  if (!isEditing) {
    alert("You can start drawing a square.");
    hideDrawPolyButtons();
    isPolygon = false;
    drawType = "square";
  } else {
    alert("Click the finish button first!");
  }
});

const rectangleButton = document.getElementById("rectangle");
rectangleButton.addEventListener("click", function () {
  if (!isEditing) {
    alert("You can start drawing a rectangle.");
    hideDrawPolyButtons();
    isPolygon = false;
    drawType = "rectangle";
  } else {
    alert("Click the finish button first!");
  }
});

const polygonButton = document.getElementById("polygon");
polygonButton.addEventListener("click", function () {
  if (!isEditing) {
    alert("You can start drawing a polygon by clicking 'Start Draw'.");
    isPolygon = true;
    showDrawPolyButtons();
  } else {
    alert("Click the finish button first!");
  }
});

// Event listener for starting polygon drawing
const startDrawPolygonButton = document.getElementById("draw-polygon");
startDrawPolygonButton.addEventListener("click", function () {
  if (!isEditing) {
    drawType = "polygon";
    alert("You can start drawing a polygon.");
  } else {
    alert("Click the finish button first!");
  }
});

// Event listener for saving polygon drawing
const stopDrawPolygonButton = document.getElementById("save-polygon");
stopDrawPolygonButton.addEventListener("click", function () {
  if (!isEditing) {
    if (polyPoints.length > 2) {
      models.polygon.push(new Polygon(polyPoints));
      printModels("polygon", models.polygon);
      isPolygon = false;
      drawType = "";
      polyPoints = [];
    }
  } else {
    alert("Click the finish button first!");
  }
});

// Event listener for adding a point to the polygon
const addPointPolygonButton = document.getElementById("add-point");
addPointPolygonButton.addEventListener("click", function () {
  for (let i = 0; i < polyPoints.length; i += 2) {
    editablePolygon.positions.push(
      transformCoordinate(canvas, polyPoints[i], polyPoints[i + 1])
    );
    editablePolygon.colors.push([1, 1, 1, 1]);
  }
  let vertexCount = editablePolygon.positions.length;
  editablePolygon.positions = convexHull(
    editablePolygon.positions,
    vertexCount
  );
  polyPoints = [];
});

// Event listener for deleting a point from the polygon
const deletePointPolygonButton = document.getElementById("delete-point");
deletePointPolygonButton.addEventListener("click", function () {
  let all = document.querySelectorAll("input[type=checkbox]");
  let deleteCount = editablePolygonPointIndex.length;
  let deleted = [];
  let parent;
  for (let item of all) {
    if (item.checked && item.id.startsWith("p")) {
      deleted.push(item.parentElement);
      if (item.nextElementSibling.textContent.startsWith("polygon")) {
        return;
      }
    }
    if (
      item.id.startsWith("p") &&
      item.nextElementSibling.textContent.startsWith("polygon")
    ) {
      parent = item.parentElement;
    }
  }

  for (let item of deleted) {
    parent.removeChild(item);
  }

  for (let i = 0; i < deleteCount; i++) {
    editablePolygon.positions.splice(editablePolygonPointIndex[i], 1);
    editablePolygon.colors.splice(editablePolygonPointIndex[i], 1);
    for (let j = i + 1; j < editablePolygonPointIndex.length; j++) {
      editablePolygonPointIndex[j] -= 1;
    }
  }

  let vertexCount = editablePolygon.positions.length;
  editablePolygon.positions = convexHull(
    editablePolygon.positions,
    vertexCount
  );
});

// Event listener for starting/stopping editing
const editButton = document.getElementById("edit");
editButton.addEventListener("click", function () {
  isEditing = !isEditing;
  if (isEditing) {
    alert("You can start editing now!");
    editButton.textContent = "Finish";
    showTransformationProperties(); // Call the function to show transformation properties
  } else {
    alert("Selected objects have been edited.");
    editButton.textContent = "Edit";
    uncheckObject();
    hideTransformationProperties(); // Call the function to hide transformation properties when editing finishes
  }
  resetTransformationInputs();
  drawType = "edit";
  editObject();
});

// Event listener for clearing the canvas
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function (e) {
  if (!isEditing) {
    location.reload();
  } else {
    alert("Click the finish button first!");
  }
});

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", function () {
  if (!isEditing) {
    const fileNameInput = document.getElementById("file-name");
    let fileName = fileNameInput.value.trim();

    // Set default filename if empty
    if (fileName === "") {
      fileName = "grafkom";
    }

    let file = save();
    let link = document.createElement("a");
    link.setAttribute("download", fileName + ".json");
    link.href = file;
    document.body.appendChild(link);
    link.click();
    alert("File saved successfully.");
  } else {
    alert("Click the finish button first!");
  }
});

// Event listener for loading canvas content from a file
const loadInput = document.getElementById("load");
loadInput.addEventListener("input", function (e) {
  if (!isEditing) {
    load(e.target.files[0]);
    alert("File loaded successfully!");
  } else {
    alert("Click the finish button first!");
  }
});

// Event listeners for mouse actions on the canvas
const canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", function (e) {
  if (isDown) {
    let { x, y } = getMousePosition(canvas, e);
    onMove(drawType, x, y);
  }
});

canvas.addEventListener("mousedown", function (e) {
  let { x, y } = getMousePosition(canvas, e);
  isDown = true;
  draw(drawType, x, y, size);
});

canvas.addEventListener("mouseup", function (e) {
  isDown = false;
});

// Event listener for color input change
const colorInput = document.getElementById("color");
colorInput.addEventListener("input", function (e) {
  rgb = e.target.value;
});

// Function to show polygon drawing buttons
function showDrawPolyButtons() {
  // Show polygon drawing buttons
  startDrawPolygonButton.hidden = false;
  stopDrawPolygonButton.hidden = false;
}

// Function to hide polygon drawing buttons
function hideDrawPolyButtons() {
  // Hide polygon drawing buttons
  startDrawPolygonButton.hidden = true;
  stopDrawPolygonButton.hidden = true;
  addPointPolygonButton.hidden = true;
  deletePointPolygonButton.hidden = true;
}

// Function to show polygon point buttons
function showPointPolyButtons() {
  // Show polygon point buttons
  addPointPolygonButton.hidden = false;
  deletePointPolygonButton.hidden = false;
}

// Function to hide polygon point buttons
function hidePointPolyButtons() {
  // Hide polygon point buttons
  addPointPolygonButton.hidden = true;
  deletePointPolygonButton.hidden = true;
}

// Function to show transformation properties
function showTransformationProperties() {
  const transformationProperties = document.getElementById("transformation");
  transformationProperties.style.display = "flex";
}

// Function to hide transformation properties
function hideTransformationProperties() {
  const transformationProperties = document.getElementById("transformation");
  transformationProperties.style.display = "none";
}

/* ==== Global Object ==== */

// Vertex shader code for rendering shapes
const vertexShaderText = `
  precision mediump float;  
  attribute vec4 a_position;
  attribute vec4 vertColor;
  varying vec4 fragColor;

  void main() {
    fragColor = vertColor;
    gl_PointSize = 10.0;
    gl_Position = a_position;
  }`;

// Fragment shader code for rendering shapes
/* to check change frag color to rgb */
const fragmentShaderText = `
  precision mediump float;
  varying vec4 fragColor;
  void main() {
    gl_FragColor = fragColor;
  }`;

const gl = canvas.getContext("webgl"); // Get WebGL context
const program = createShaderProgram(vertexShaderText, fragmentShaderText); // Create shader program

let drawType = null; // Type of shape to draw
let size = 75; // Default size for dilation
let isDown = false; // Flag for mouse down state
let savedFile = null; // Saved file data
let models = {
  line: [], // Array to store line models
  square: [], // Array to store square models
  rectangle: [], // Array to store rectangle models
  polygon: [], // Array to store polygon models
};

let rgb = "#3096fc"; // Default color for shapes

/* ==== Function ==== */

// Function called when the window loads
window.onload = function start() {
  if (!gl) {
    alert("WebGL not supported");
  }

  clear();
};

// Function to clear the canvas
function clear() {
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

// Function called when mouse moves on the canvas
function onMove(type, x, y) {
  let [realWidth, realHeight] = transformCoordinate(canvas, x, y);
  if (type === "line") {
    // Get the latest line object and call onRenderMove
    let lenObject = models["line"].length;
    models["line"][lenObject - 1].onRenderMove(realWidth, realHeight);
  } else if (type === "rectangle") {
    // Get the latest rectangle object and call onRenderMove
    let lenObject = models["rectangle"].length;
    models["rectangle"][lenObject - 1].onRenderMove(realWidth, realHeight);
  }
}

// Function to load a shader
function loadShader(type, input) {
  let shader = gl.createShader(type); // Create shader object

  gl.shaderSource(shader, input); // Set shader source code
  gl.compileShader(shader); // Compile the shader

  // Check for compilation errors
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling shader!",
      gl.getShaderInfoLog(shader)
    );
    return null;
  }

  return shader;
}

// Function to create a shader program
function createShaderProgram(vertexShaderText, fragmentShaderText) {
  // Load vertex and fragment shaders
  const vertexShader = loadShader(gl.VERTEX_SHADER, vertexShaderText);
  const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fragmentShaderText);

  // Create program and attach shaders
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program); // Link the program

  // Check for linking errors
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  // Validate the program
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  // Clean up
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

// Function to render data
/* size is component per vertices */
function render(
  gl,
  program,
  attribute = "a_position",
  arr = [],
  size = 3,
  type = gl.FLOAT,
  isNormalized = gl.FALSE
) {
  const attributeLocation = gl.getAttribLocation(program, attribute);
  const buffer = gl.createBuffer();

  const stride = 0; // Later changes needed
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);

  gl.useProgram(program);
  gl.enableVertexAttribArray(attributeLocation);
  gl.vertexAttribPointer(
    attributeLocation,
    size,
    type,
    isNormalized,
    stride,
    offset
  );
}

// Function to render vertex color
function renderColor(program, arr = [], size = 3) {
  render(gl, program, "vertColor", arr, size);
}

// Function to render vertex positions
function renderVertex(program, arr = [], size = 3) {
  render(gl, program, "a_position", arr, size);
}

// Function to draw models on the canvas
function draw(model, x, y) {
  // Check if WebGL is supported
  if (!gl) {
    alert("WebGL not supported");
    return;
  }

  // Check if the WebGL program is created
  if (!program) {
    alert("Failed creating WebGL Program");
    return;
  }

  // Check the model type and drawing mode
  if (model === "line" && !isPolygon) {
    models.line.push(new Line(x, y, program)); // Create a new line object
    printModels("line", models.line); // Print line models
  }
  else if (model === "rectangle" && !isPolygon) {
    models.rectangle.push(new Rectangle(x, y, program)); // Create a new rectangle object
    printModels("rectangle", models.rectangle); // Print rectangle models
  }
  else if (model === "square" && !isPolygon) {
    models.square.push(new Square(x, y, program)); // Create a new square object
    printModels("square", models.square); // Print square models
  }
  else if (model === "polygon") {
    polyPoints.push(x, y); // Add points to the polygon
  }
  else {
    return;
  }
}

// Function to save models as JSON file
function save() {
  let jsonFile = JSON.stringify(models); // Convert models to JSON format
  let data = new Blob([jsonFile], { type: "application/json" }); // Create a Blob object

  // Revoke the existing object URL if it already exists
  if (savedFile !== null) {
    window.URL.revokeObjectURL(savedFile);
  }

  savedFile = window.URL.createObjectURL(data); // Create a new object URL
  return savedFile;
}

// Function to load models from a JSON file
function loadModel(loadedModel) {
  resetState(); // Reset the state
  let keys = Object.keys(loadedModel);
  for (let key of keys) {
    for (let item of loadedModel[key]) {
      if (key === "line") {
        let obj = new Line(0, 0);
        obj.copy(item);
        models[key].push(obj);
        printModels("line", models.line);
      }
      else if (key === "rectangle") {
        let obj = new Square(0, 0);
        obj.copy(item);
        models[key].push(obj);
        printModels("rectangle", models.rectangle);
      }
      else if (key === "square") {
        let obj = new Square(0, 0);
        obj.copy(item);
        models[key].push(obj);
        printModels("square", models.square);
      }
      else if (key === "polygon") {
        let obj = new Polygon(polyPoints);
        obj.copy(item);
        models[key].push(obj);
        printModels("polygon", models.polygon);
      }
    }
  }
}

// Function to load models from a file input
function load(file) {
  let reader = new FileReader(); // Create a FileReader object
  reader.readAsText(file); // Read the file as text
  reader.addEventListener("load", function (e) {
    loadModel(JSON.parse(reader.result)); // Parse and load the JSON data
  });
}

// Function to reset the state and clear models
function resetState() {
  // Reset models and polygon points
  models.line = [];
  models.polygon = [];
  models.rectangle = [];
  models.square = [];
  polyPoints = [];
}

// Function to render objects on the canvas
function renderObject() {
  clear(); // Clear the canvas
  let keys = Object.keys(models);
  for (let key of keys) {
    for (let model of models[key]) {
      model.render(program); // Render each model
    }
  }

  // Render per frame (1s / 60 frame)
  window.requestAnimFrame(function (program) {
    renderObject(program);
  });
}

// RequestAnimationFrame polyfill for cross-browser compatibility
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

renderObject(program); // Start rendering objects
