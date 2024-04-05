// Rectangle class represents a rectangle shape
class Rectangle extends Shape {
  /**
   * Constructs a new Rectangle object.
   * @param {number} x - The X coordinate of the starting point.
   * @param {number} y - The Y coordinate of the starting point.
   */
  constructor(x, y) {
    super();
    // Initialize properties
    let { r, g, b } = getColors(rgb);
    for (let i = 0; i < 4; i++) {
      this.positions.push(transformCoordinate(canvas, x, y));
      this.colors.push([r, g, b, 1]);
    }
  }

  /**
   * Renders the rectangle shape.
   * @param {*} program - WebGL program.
   */
  render(program) {
    this.setCentroid();
    let rectangleCount = this.positions.length;
    renderColor(program, flatten(this.colors), 4);
    renderVertex(program, flatten(this.positions), 2);
    for (let i = 0; i < rectangleCount; i += 4) {
      gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
    }
  }

  /**
   * Updates the position of the rectangle during rendering.
   * @param {number} x - The X coordinate of the new position.
   * @param {number} y - The Y coordinate of the new position.
   */
  onRenderMove(x, y) {
    let count = this.positions.length;
    this.positions[count - 1][0] = x;
    this.positions[count - 1][1] = y;
    this.positions[count - 2][1] = y;
    this.positions[count - 3][0] = x;
  }
}
