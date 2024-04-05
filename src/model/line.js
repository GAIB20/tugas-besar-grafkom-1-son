class Line extends Shape {
    constructor(x, y) {
      super();
      let { r, g, b } = getRGB(rgb);
      for (let i = 0; i < 2; i++) {
        this.positions.push(transformCoordinate(canvas, x, y));
        this.colors.push([r, g, b, 1]);
      }
    }
  
    render(program) {
      this.setCentroid();
      renderColor(program, flatten(this.colors), 4);
      renderVertex(program, flatten(this.positions), 2);
      for (let i = 0; i < this.positions.length; i += 2) {
        gl.drawArrays(gl.LINES, i, 2);
      }
    }
  
    onRenderMove(x, y) {
      let len = this.positions.length;
      this.positions[len - 1][0] = x;
      this.positions[len - 1][1] = y;
    }
  }