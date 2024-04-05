// Line class represents a line shape
class Line extends Shape {
  /**
   * Constructs a new Line object.
   * @param {number} x - The X coordinate of the starting point.
   * @param {number} y - The Y coordinate of the starting point.
   */
  constructor(x, y) {
    super();
    // Initialize properties
    let { r, g, b } = getRGB(rgb);
    for (let i = 0; i < 2; i++) {
      this.positions.push(transformCoordinate(canvas, x, y));
      this.colors.push([r, g, b, 1]);
    }
  }

  /**
   * Renders the line shape.
   * @param {*} program - WebGL program.
   */
  render(program) {
    this.setCentroid();
    renderColor(program, flatten(this.colors), 4);
    renderVertex(program, flatten(this.positions), 2);
    for (let i = 0; i < this.positions.length; i += 2) {
      gl.drawArrays(gl.LINES, i, 2);
    }
  }

  /**
   * Updates the position of the line during rendering.
   * @param {number} x - The X coordinate of the new position.
   * @param {number} y - The Y coordinate of the new position.
   */
  onRenderMove(x, y) {
    let len = this.positions.length;
    this.positions[len - 1][0] = x;
    this.positions[len - 1][1] = y;
  }
}
