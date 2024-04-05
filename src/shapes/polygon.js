// Polygon class represents a polygon shape
class Polygon extends Shape {
  /**
   * Constructs a new Polygon object.
   * @param {Array} polyPoints - Array of polygon vertices.
   */
  constructor(polyPoints) {
    super();
    // Initialize properties
    this.polyPoints = polyPoints;
    let { r, g, b } = getRGB(rgb);
    for (let i = 0; i < polyPoints.length; i += 2) {
      this.positions.push(
        transformCoordinate(canvas, polyPoints[i], polyPoints[i + 1])
      );
      this.colors.push([r, g, b, 1]);
    }
    let vertexCount = this.positions.length;
    this.positions = convexHull(this.positions, vertexCount);

    let newVertexCount = this.positions.length;
    let deletedVertexCount = newVertexCount - vertexCount;
    this.colors.splice(newVertexCount, deletedVertexCount);
  }

  /**
   * Copies properties from another Polygon object.
   * @param {Polygon} obj - The Polygon object to copy properties from.
   */
  copy(obj) {
    super.copy(obj);
    this.polyPoints = obj.polyPoints;
  }

  /**
   * Renders the polygon shape.
   * @param {*} program - WebGL program.
   */
  render(program) {
    this.setCentroid();
    let vertexCount = this.positions.length;
    renderColor(program, flatten(this.colors), 4);
    renderVertex(program, flatten(this.positions), 2);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
  }
}
