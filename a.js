fullscreen(); // sets global variables w, h
c.width = (w = innerWidth) * devicePixelRatio;
c.height = (h = innerHeight) * devicePixelRatio;
c.style.width = innerWidth + "px";
c.style.height = innerHeight + "px";

function fillCircle(d, x, y, r) {
  d.beginPath();
  d.arc(x, y, r, 0, Math.PI * 2);
  d.fill();
}

function strokeCircle(d, x, y, r) {
  d.beginPath();
  d.arc(x, y, r, 0, Math.PI * 2);
  d.stroke();
}

var piece_locs = [[50, 50], [w-50,50], [50, h-50], [w-50,h-50]];

function render(state) {
  var pieces = (16 + state.num).toString(2).substring(1).split('')
      .map(function(x) { return x == "1"});

  d.save();
  d.scale(devicePixelRatio, devicePixelRatio);
  d.clearRect(0,0,w,h);

  _.each(piece_locs, function(c, ix) {
    if (pieces[ix]) {
      d.fillStyle = "#fec";
    }
    else {
      d.fillStyle = "#cef";
    }
    fillCircle(d, c[0],c[1],40,40);
    strokeCircle(d, c[0],c[1],40,40);
  });
  if (state.show) {
    var g = 0.9 * (1 - 1 / (1 + state.iter));
    d.fillStyle = rgb(g,g,g);
    d.font = "120px sans-serif";
    d.textAlign = "center";
    d.fillText(state.num.toString(16).toUpperCase(), w/2, h/2 + 60);
  }
  d.restore();
}

function new_random_state() {
  var new_num = int(Math.random() * 15);
  state.num = new_num >= state.num ? new_num + 1 : new_num;
  state.iter++;
  state.show = false;
  if (state.timeout) {
    clearTimeout(state.timeout);
  }
  state.timeout = setTimeout(function() {
    state.show = true;
    render(state);
  }, 2000);
  render(state);
}

$(document).on("keypress", function(e) {
  var typed = String.fromCharCode(e.charCode);
  if (state.num.toString(16) == typed) {
    new_random_state();
  }
});

state = {num:13, iter: 0, show:true};
render(state);
