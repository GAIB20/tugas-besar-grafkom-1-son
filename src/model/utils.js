 function getMousePosition(canvas, e) {
    const pos = canvas.getBoundingClientRect();
    // const e = windows.event;
    const pos_x = e.clientX;
    const pos_y = e.clientY;
    const x = pos_x - pos.x;
    const y = pos_y - pos.y;
    return { x, y };
  }

 function getRGB(color) {
    const hexa_red = parseInt(color.substr(1, 2), 16);
    const hexa_green = parseInt(color.substr(3, 2), 16);
    const hexa_blue = parseInt(color.substr(5, 2), 16);
  
    const red = hexa_red / 255;
    const green = hexa_green / 255;
    const blue = hexa_blue / 255;
  
    return { red, green, blue };
  }

  function resizeCanvas(canvas) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const resizer = canvas.width !== w || canvas.height !== h;

    if (resizer) {
      canvas.width = w;
      canvas.height = h;
    }
  
    return resizer;
  }

 function centroid(matrix) {
    let x = 0;
    let y = 0;
    let counter = matrix.length;
    
    for (i = 0; i < counter; i++) {
      x += matrix[i][0];
      y += matrix[i][1];
    }
  
    x = x / counter;
    y = y / counter;
  
    return [x, y];
  }

  function transformCoordinate(canvas, x, y) {
    const pos = canvas.getBoundingClientRect();
    const [w, h] = [pos.width, pos.height];
  
    /* Converts from coordinate to zero to one */
    /* converts zero to one to zero to two */
    /* Converts zero to two to -1 to 1 */
    const new_width = (x / w) * 2 - 1;
    const new_height = (y / h) * -2 + 1;
  
    return [new_width, new_height];
  }
  

  function flatten(matrix) {
    let l = matrix.length;
    let n = l;
    let isArr = false;
  
    if (Array.isArray(matrix[0])) {
      isArr = true;
      n *= matrix[0].length;
    }
  
    let result = new Float32Array(n);
    let c = 0;
  
    if (isArr) {
      for (let i = 0; i < l; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          result[c++] = matrix[i][j];
        }
      }
    } else {
      for (let i = 0; i < l; i++) {
        result[c++] = matrix[i];
      }
    }
  
    return result;
  }
  
  
  
function index_left(pos, counter_vertex) {
    let index_left = 0;
    for (let i = 1; i < counter_vertex; i ++) {
      if (pos[i][0] < pos[leftMostPtIndex][0]){
        index_left = i;
      }
    }
    return index_left;
  }
  
  function convexHull(pos, counter_vertex) {
    if (counter_vertex < 3) {
      return;
    }
  
    let new_convexHull = [];
    let left_index = index_left(pos, counter_vertex)
  
    let firstPointIndex = left_index;
    let secondPointIndex;
    do {
      new_convexHull.push(pos[firstPointIndex]);
      
      secondPointIndex = (firstPointIndex + 1) % counter_vertex;
  
      for (let i = 0; i < counter_vertex; i ++) {
        if (orientationOf3Points(pos[firstPointIndex], pos[i], pos[secondPointIndex]) == 2) {
          secondPointIndex = i;
        }
      }
      firstPointIndex = secondPointIndex
    } while (firstPointIndex != left_index)
  
    return new_convexHull;
  }


  function orientationPoints3D(a, b, c) {
    let v = (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]);
    if (v == 0) {
      return 0;
    }
    return (v > 0)? 1:2;
  }
  