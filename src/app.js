// canvas setup
const canvas = document.getElementById('canvas');
const gl = setupWebGL(canvas);
const offsetCorr = (3.5 / 100) * window.innerHeight;    // corrections for css

// list of [x, y] where -1 < x, y < 1
let vertices = []; 

// list of [r, g, b, a] where 0 < r, g, b, a < 1
let colors = [];    
let starting = [];
