const presets = {
  easy: {
    width: 8,
    height: 8,
    delay: 18
  },
  medium: {
    width: 16,
    height: 16,
    delay: 4
  },
  difficult: {
    width: 32,
    height: 32,
    delay: 1
  },
  ridiculous: {
    width: 45,
    height: 70,
    delay: 0
  }
}

const keycodes = {
  r: 82,
  space: 32,
  w: 87,
  a: 65,
  s: 83,
  d: 68
}

let keybindings = { // make these user configurable?
  north: keycodes.w,
  west: keycodes.a,
  south: keycodes.s,
  east: keycodes.d,
  reset: keycodes.r
}

let maze = null;  // global, not set until hit r
let isPlaying = false;  // also global

const reload = function () {
  let difficulty = d3.select('input[type="radio"]:checked').attr('value').toLowerCase();
  let options = presets[difficulty];
  options.d3Maze = d3.select('.maze');
  options.d3Maze.classed('easy medium difficult ridiculous hidden', false).classed(difficulty, true);
  isPlaying = true; // start game
  d3.select('.victory-message').classed('hidden', true);
  maze = new Maze(options);  // maze is global
}

const move = function (direction) {
  if (!isPlaying) return;
  if (!maze.avatar.walls[direction]) {
    maze.avatar.d3Element.classed('avatar', false);
    maze.avatar = maze.avatar.neighbors[direction];
    maze.avatar.d3Element.classed('avatar', true);

    if (maze.avatar === maze.end) { // victory!
      d3.select('.maze').classed('hidden', true);
      d3.select('.victory-message').classed('hidden', false);
      isPlaying = false;
    }
  } else {  // hit wall!
    // visual flicker?
  }
}

const readInput = function () {
  document.querySelector('.controls').addEventListener('click', function (e) {
    const classList = e.target.classList;
    if (classList.contains('reload')) reload();
    if (classList.contains('north')) direction = 'north';
    else if (classList.contains('east')) direction = 'east';
    else if (classList.contains('west')) direction = 'west';
    else if (classList.contains('south')) direction = 'south';
    else return;  // didn't hit a button
    move(direction);
  });
  document.documentElement.addEventListener('keydown', function (e) {
    let press = e.which;
    if (press === keybindings.reset) {
      reload();
    } else if (maze && isPlaying) { // if no maze, we don't care
      ['north', 'east', 'south', 'west'].forEach(function (direction) {
        if (press === keybindings[direction]) move(direction);  
      });
    }
  });
};

window.addEventListener('load', function () {
  console.log('DOM Loaded.');
  readInput();
  document.getElementsByClassName('btn')[0].addEventListener('click', function (e) {
    d3.select(this).classed('hidden', true);
    d3.select('form').classed('hidden', false);
  });
});
