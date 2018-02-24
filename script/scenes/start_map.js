// NODE CLASSE //

class mapNode {
  constructor(params, name) {
    this.x = params.x;
    this.y = params.y;
    this.tx = params.text.x; // text pos
    this.ty = params.text.y;
    
    this.name = name;
    this.datas = {};
    this.hover = false;
    this.color = "grey"; //fx starting color
    this.fxW = 0; //fx width
    this.fxA = 0; //fx alpha
  }

  //render a node
  render(layer) {
    //render gfx
    layer.save();
    layer.a(this.fxA);
    layer.context.filter = "blur(" + this.fxW + "px)";
    layer.lineWidth(5);
    layer.strokeStyle(this.color);
    layer.strokeCircle(this.x, this.y, 30);
    layer.restore();

    //render node
    layer.lineWidth(2);
    layer.fillStyle("#333");
    // layer.fillCircle(this.x, this.y, 30);
    layer.strokeStyle("black");
    layer.strokeCircle(this.x, this.y, 30);

    // text gfx
    layer.save();
    layer.a(this.fxA);
    layer.font('32px Arial');
    layer.fillStyle('black');
    layer.textAlign('center');
    layer.save();
    layer.context.filter = "blur(" + this.fxW + "px)";
    layer.fillText(this.name, this.tx, this.ty);
    layer.restore();
    // text
    layer.fillText(this.name, this.tx, this.ty);
    layer.restore();
  }

  // fade in effect
  spoted(app) {
    var t = app.tween(this).to({color: "black", fxW: 5, fxA: 1}, 0.155);
  }

  // fade out effect
  unSpoted(app) {
    var t = app.tween(this).to({color: "grey", fxW: 1, fxA: 0.0}, 0.155);
  }

  // on hover
  collide(app, mouse) {
    if (app.dist(mouse.x, mouse.y, this.x, this.y) < 30) {
      this.spoted(app);
      this.hover = true;
    } else {
      this.unSpoted(app);
      this.hover = false;
    }
  }
}

// NEW STATE
ENGINE.start_map = {

  getMapData: function() {
    this.map = [];
    var datas = this.app.data.map.regions;
    for(data in datas) {
      var n = new mapNode(datas[data], data/*.x, datas[data].y, data*/)
      this.map.push(n); 
    }
  },

  renderMap: function() {
    if(this.map) {
      for (node of this.map) {
        node.render(this.app.layer);
      }
    }
  },

  selectNode: function(mouse) {
    if(this.map) {
      for (node of this.map) {
        node.collide(app, mouse);
      }
    } 
  },

  create: function() {
    this.getMapData();
    this.transitionA = 1;
    setTimeout(() => {
      this.app.tween(this).to({transitionA: 0}, 0.95);
    }, 100);
  },

  mousemove: function(mouse) {
    this.selectNode(mouse);
  },

  render: function() {
    this.app.layer.clear("#333");
    this.app.layer.drawImage(this.app.images['MAP1'], 0, 0);
    this.renderMap();
  }
}