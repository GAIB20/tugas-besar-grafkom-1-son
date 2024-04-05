function printModels(model, obj) {
  objCount = obj.length;
  pointCount = obj[objCount - 1].positions.length;
  let list = document.getElementById("list");
  object = document.createElement("div");
  object.innerHTML = `
  <input type="checkbox" id="${model[0]}${objCount}" name="${model[0]}${objCount}" value="${model[0]}${objCount}" >
  <label for="${model[0]}${objCount}">${model} ${objCount}</label><br>
   `;
  list.appendChild(object);

  for (let i = 1; i <= pointCount; i++) {
    let point = document.createElement("div");
    point.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp
    <input type="checkbox" id="${model[0]}${objCount}point${i}" name="${model[0]}${objCount}point" value="${model[0]}${objCount}point${i}">
    <label for="${model[0]}${objCount}point${i}">vertex ${i}</label><br>
    `;

    object.appendChild(point);
  }

  // set the checkbox to be checked
  let shapeSelection = document.getElementById(`${model[0]}${obj.length}`);
  let objectCount = obj.length;
  shapeSelection.addEventListener("change", function () {
    if (shapeSelection.checked) {
      document
        .querySelectorAll(`input[name="${model[0]}${objectCount}point"]`)
        .forEach((item) => {
          item.checked = true;
        });
    } else {
      document
        .querySelectorAll(`input[name="${model[0]}${objectCount}point"]`)
        .forEach((item) => {
          item.checked = false;
        });
    }
  });
}
