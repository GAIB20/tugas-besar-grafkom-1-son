class Polygon extends Shape {
    constructor(polyPoints) {
      super();
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
  
    copy(obj) {
      super.copy(obj);
      this.polyPoints = obj.polyPoints;
    }
  
    render(program) {
      this.setCentroid();
      let vertexCount = this.positions.length;
  
      renderColor(program, flatten(this.colors), 4);
      renderVertex(program, flatten(this.positions), 2);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexCount);
    }
  }