const Matrix = function (width, height) {
  this.width = width;
  this.height = height;
  this.grid = this.buildMatrix(this.width, this.height); // build matrix
  this.allNodesSerialized = []; // keep references to all nodes in matrix
                                // remember objects are stored in vars as references
  let that = this;
  this.grid.forEach(function (row) {
    row.forEach(function (node) {
      that.allNodesSerialized.push(node);
    });
  }); // .allNodesSerialized should now be populated
  this.populateNeighbors(); // link each node to its neighbors
}

Matrix.prototype.getRows = function () {
  return this.grid; // array of row arrays
}

Matrix.prototype.buildMatrix = function (width, height) {
  let grid = [];
  for (let i = 0; i < height; i++) { // first do rows, to match DOM
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(new Node(i, j));
    }
    grid.push(row);
  }
  return grid;
}

Matrix.prototype.populateNeighbors = function () {
  let that = this;
  this.allNodesSerialized.forEach(function (node) { // made this arr so we
                                                    // could do this!
    // set node.neighbors.north
    if (node.row > 0) { // if not top row
      node.neighbors.north = that.grid[node.row - 1][node.col];
    } else {
      node.neighbors.north = null;
    }
    // set east
    if (node.col < that.width - 1) {  // if before (<) the edge (this.width-1)
      node.neighbors.east = that.grid[node.row][node.col + 1];
    } else {
      node.neighbors.east = null;
    }
    // set south
    if (node.row < that.height - 1) {// if before (<) the edge (this.height-1)
      node.neighbors.south = that.grid[node.row + 1][node.col];
    } else {
      node.neighbors.south = null;
    }
    // set west
    if (node.col > 0) {
      node.neighbors.west = that.grid[node.row][node.col - 1];
    } else {
      node.neighbors.west = null;
    }
  });
}

// function rand(max) {}; defined in globals.js

Matrix.prototype.getRandomNode = function () {
  return this.allNodesSerialized[rand(this.allNodesSerialized.length)];
}
