class Rectangle extends Shape {
    constructor(x, y) {
      super();
      let { r, g, b } = getRGB(rgb);
      for (let i = 0; i < 4; i++) {
        this.positions.push(transformCoordinate(canvas, x, y));
        this.colors.push([r, g, b, 1]);
      }
    }
    render(program) {
      this.setCentroid();
  
      let recSize = this.positions.length;
      renderColor(program, flatten(this.colors), 4);
      renderVertex(program, flatten(this.positions), 2);
      for (let i = 0; i < recSize; i += 4) {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
      }
    }
  
    onRenderMove(x, y) {
      let len = this.positions.length;
      this.positions[len - 1][0] = x;
      this.positions[len - 1][1] = y;
      this.positions[len - 2][1] = y;
      this.positions[len - 3][0] = x;
    }
  }
  