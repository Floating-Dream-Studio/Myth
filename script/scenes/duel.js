// store and manage graphical information for each card
class cardState {
  constructor(x, y) {
    this.w = 200;
    this.h = 300;
    // get center not left top corner
    this.x = x + this.w/2;
    this.y = y + this.h/2;
    this.zoomLevel = 1;
    this.prio = 0;
  }

  collide(m) {
    var {x, y , w, h} = this;
    // get graphical X and Y
    x -= w/2;
    y -= h/2;
    if(m.x < x + w && m.x > x && m.y < y + h && m.y > y)
      return true;
    return false;
  }

  hover(app) {
    app.tween(this).to({y: app.layer.height - 100, zoomLevel: 1.4}, 0.2);
    this.prio = 1;
  }

  leave(app) {
    app.tween(this).to({y: app.layer.height - 50, zoomLevel: 1}, 0.2);
    this.prio = 0;
  }

  render(app) {
    app.layer.save();
    app.layer.fillStyle("white");
    app.layer.strokeStyle("black");
    app.layer.translate(this.x, this.y);
    app.layer.align(0.5, 0.5);
    app.layer.scale(this.zoomLevel, this.zoomLevel);
    let {width, height} = app.images["CARD_TEST_3"];
    app.layer.drawImage(app.images["CARD_TEST_3"], 0, 0, width, height, 0, 0, this.w, this.h);
    app.layer.strokeRect(0, 0, this.w, this.h);
    app.layer.restore();
  }
}

class Player {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.handState = [];
  }

  loadDeck(data) {
    this.deck = data.slice();
  }

  getCard(n) {
    for(var i = 0; i < n; i++) {
      this.hand.push(this.deck.pop());
    }
  }

  buildDeckState(app) {
    var n = this.hand.length;
    //find first x to center all cards 
    var sx = (app.width/2) - (n * 200 + (n - 1) * 15)/2;

    for(var i = 0; i < n; i++) {
      this.hand[i].state = new cardState(sx + i*215, app.layer.height - 100);
    }
  }

  displayDeck(app) {
    for(var cs of this.hand) {
      cs.state.render(app);
    }
  }

  animateCard(app) {
    for(var cs of this.hand) {
      if(cs.state.collide(app.mouse)) {
        cs.state.hover(app);
        this.hand.sort((a, b) => {return a.state.prio - b.state.prio});
      } else {
        cs.state.leave(app);
      }
    }
  }
}

class AI extends Player {
  
}

// test State
ENGINE.duel = {

  create: function() {
    this.cards = [];
    this.player = new Player();
    this.player.loadDeck(this.app.data.player.deck);
    this.player.getCard(5); 
    this.player.buildDeckState(this.app);
  },

  mousemove: function(m) {
    this.player.animateCard(this.app);
  },

  render: function() {
    // this.app.layer.clear("#333");
    this.app.layer.drawImage(this.app.images["bois3"], 0, 0);
    this.player.displayDeck(this.app);
    this.app.layer.fillStyle("white");
  }
}