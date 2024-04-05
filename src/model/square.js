class Square extends Shape {
    constructor(x, y) {
      super();
      let tempPosition = [];
      let tempColor = [];
      tempPosition.push(transformCoordinate(canvas, x, y));
      tempPosition.push(transformCoordinate(canvas, x + size, y));
      tempPosition.push(transformCoordinate(canvas, x, y + size));
      tempPosition.push(transformCoordinate(canvas, x + size, y + size));
      let { r, g, b } = getRGB(rgb);
      /* colors */
      for (let i = 0; i < 4; i++) {
        tempColor.push([r, g, b, 1]);
      }
  
      this.colors.push(...tempColor);
      this.positions.push(...tempPosition);
    }
  
    render(program) {
      this.setCentroid();
      let arrSize = this.positions.length;
  
      renderColor(program, flatten(this.colors), 4);
      renderVertex(program, flatten(this.positions), 2);
      for (let i = 0; i < arrSize; i += 4) {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
      }
    }
  }