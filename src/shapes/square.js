// Square class represents a square shape
class Square extends Shape {
  /**
   * Constructs a new Square object.
   * @param {number} x - The X coordinate of the starting point.
   * @param {number} y - The Y coordinate of the starting point.
   */
  constructor(x, y) {
    super();
    // Initialize properties
    let currentPosition = [];
    let currentColor = [];
    currentPosition.push(transformCoordinate(canvas, x, y));
    currentPosition.push(transformCoordinate(canvas, x + size, y));
    currentPosition.push(transformCoordinate(canvas, x, y + size));
    currentPosition.push(transformCoordinate(canvas, x + size, y + size));
    let { r, g, b } = getRGB(rgb);
    for (let i = 0; i < 4; i++) {
      currentColor.push([r, g, b, 1]);
    }
    this.colors.push(...currentColor);
    this.positions.push(...currentPosition);
  }

  /**
   * Renders the square shape.
   * @param {*} program - WebGL program.
   */
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
