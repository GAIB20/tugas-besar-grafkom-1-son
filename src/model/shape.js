class Shape {
    constructor() {
      this.positions = [];
      this.colors = [];
      this.selected = false;
      this.selectedVetrices = [];
      this.scale = [0, 0];
      this.rotation = 0;
      this.translation = [0, 0];
      this.centroid = [0, 0];
    }
  
    copy(obj) {
      this.positions = obj.positions;
      this.colors = obj.colors;
      this.selected = obj.selected;
      this.scale = obj.scale;
      this.rotation = obj.rotation;
      this.translation = obj.translation;
    }
  
    scale(x, y) {
      throw new Error("Must be implemented");
    }
  
    translate(x, y) {
      throw new Error("Must be implemented");
    }
  
    rotate(deg) {
      throw new Error("Must be implemented");
    }
  
    move() {
      throw new Error("Must be implemented");
    }
  
    onRenderMove(x, y) {
      throw new Error("Must be implemented");
    }
  
    isClick() {
      return this;
    }
  
    toggleSelect() {
      this.selected = !this.selected;
    }
  
    render() {
      throw new Error("Must be implemented");
    }
  
    setCentroid() {
      this.centroid = centroid(this.positions);
    }
  }