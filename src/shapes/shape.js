// Shape class represents a basic geometric shape
class Shape {
  /**
   * Constructs a new Shape object.
   */
  constructor() {
    // Initialize properties
    this.selected = false;  // Indicates if the shape is selected
    this.colors = [];    // Array of vertex colors
    this.positions = []; // Array of vertex positions
    this.selectedVertices = [];  // Indices of selected vertices
    this.rotation = 0;       // Rotation angle in degrees
    this.scale = [0, 0];    // Scale factors in X and Y direction
    this.centroid = [0, 0];     // Centroid coordinates
    this.translation = [0, 0];  // Translation offsets in X and Y direction
  }

  /**
   * Copies properties from another Shape object.
   * @param {Shape} obj - The Shape object to copy properties from.
   */
  copy(obj) {
    // Copy properties
    this.colors = obj.colors;
    this.positions = obj.positions;
    this.scale = obj.scale;
    this.selected = obj.selected;
    this.translation = obj.translation;
    this.rotation = obj.rotation;
  }

  // Methods to be implemented by subclasses
  isClick() {
    return this;
  }
  move() {
    throw new Error("Not implemented yet");
  }
  onRenderMove(x, y) {
    throw new Error("Not implemented yet");
  }
  translate(x, y) {
    throw new Error("Not implemented yet");
  }
  rotate(deg) {
    throw new Error("Not implemented yet");
  }
  scale(x, y) {
    throw new Error("Not implemented yet");
  }
  render() {
    throw new Error("Not implemented yet");
  }
  toggleSelect() {
    this.selected = !this.selected;
  }

  /**
   * Calculates and sets the centroid of the shape.
   */
  setCentroid() {
    this.centroid = centroid(this.positions);
  }
}
