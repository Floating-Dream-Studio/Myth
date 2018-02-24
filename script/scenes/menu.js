class Button {
  constructor(label, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.hover = false;
    this.color = "grey"; //fx starting color
    this.fxW = 0; //fx width
    this.fxA = 0; //fx alpha

    this.bcolor = "#F2DBC4";
  }


  onclick() {
    console.log('no special effect');    
  }

  collide(app, mouse) {
    if (mouse.x > this.x && mouse.x < this.x + this.w && mouse.y > this.y && mouse.y < this.y + this.h) {
      this.spoted(app);
    } else {
      this.unSpoted(app);
    }
  }

  activate(mouse) {
    if (mouse.x > this.x && mouse.x < this.x + this.w && mouse.y > this.y && mouse.y < this.y + this.h) {
      this.onclick();
    }
  }

  spoted(app) {
    var t = app.tween(this).to({color: "black", fxW: 5, fxA: 1}, 0.155);
  }

  unSpoted(app) {
    var t = app.tween(this).to({color: "grey", fxW: 1, fxA: 0.0}, 0.155);
  }

  render(layer) {
    //gfx
    layer.save();
    layer.a(this.fxA);
    layer.context.filter = "blur(" + this.fxW + "px)";
    layer.lineWidth(8);
    layer.strokeStyle(this.color);
    layer.strokeRect(this.x, this.y, this.w, this.h);
    layer.restore();
    // button
    layer.fillStyle(this.bcolor);
    layer.strokeStyle('black');
    layer.lineWidth(3);
    layer.fillRect(this.x, this.y, this.w, this.h);
    layer.strokeRect(this.x, this.y, this.w, this.h);
    // text
    layer.font('32px Arial');
    layer.textAlign('center');
    layer.fillStyle('black');
    layer.fillText(this.label, this.x + this.w/2, this.y + 32 + (this.h - 32)/2);
  }
}

ENGINE.menu = {
  setMenu: function() {
    // size
    var w = this.app.width; var h = this.app.height;
    // button with/height
    var bw = 200; var bh = 80;
    // number of buttons
    var n = 3;
    // margin
    var m = 20;
    // start x
    var sx = (w-bw)/2;
    // start y
    var sy = h/2 - n*(bh + m)/2;
    // create an array of buttons
    this.buttons = [];
    // fill the array
    for(var i = 0; i < n; i++) {
      var b = new Button('test', sx, sy + i * (bh + m), bw, bh);
      this.buttons.push(b);
    }
    // set labels
    this.buttons[0].label = 'START';
    this.buttons[1].label = 'DECK';
    this.buttons[2].label = 'DUEL';

    this.buttons[0].onclick = function() {
      app.setState(ENGINE.start_map);
    }

    this.buttons[2].onclick = function() {
      app.setState(ENGINE.duel);
    }
  },

  select: function(mouse) {
    for(b of this.buttons) {
      b.collide(app, mouse);
    }
  },

  click: function(mouse) {
    for(b of this.buttons) {
      b.activate(mouse);
    }
  },

  renderButtons: function() {
    for(b of this.buttons) {
      b.render(this.app.layer);
    }
  },

  create: function() {
    this.setMenu();
  },

  mousemove: function(mouse) {
    this.select(mouse);
  },

  mousedown: function(mouse) {
    this.click(mouse);
  },

  render: function() {
    this.app.layer.clear('#333');
    this.renderButtons();
  }
}