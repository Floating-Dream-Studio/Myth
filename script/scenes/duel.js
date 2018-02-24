function cardState(x, y) {
  this.x = x;
  this.y = y;
  this.w = 200;
  this.h = 300;
  this.zoomLevel = 1;
  this.prio = 0;
}

// test State
ENGINE.duel = {

  buildDeckState: function(n) {
    //find first x to center all cards    
    var sx = (this.app.width/2) - (n * 200 + (n - 1) * 15)/2;

    for(var i = 0; i < n; i++) {
      this.cards[i] = new cardState(sx + i*215, 400);
    }
  },

  displayDeck: function() {
    //reset positions
    this.buildDeckState();
    for(var i = this.cards.length-1; i >= 0; i--) {
      var {zoomLevel, x, y, prio} = this.cards[i];
      //display each card
      this.app.layer.drawImage(this.app.images["CARD_TEST_3"], 0, 0, 400, 600, x, y,
        200*zoomLevel, 300*zoomLevel);
    }
  },

  create: function() {
    this.cards = [];
    this.buildDeckState(5);
  },

  mousemove: function(m) {
    for(var i = 0; i < this.cards.length; i++) {
      var {x, y, w, h, zoomLevel} = this.cards[i];
      if (m.x > x && m.x < x + w && m.y > y && m.y < y + h) {
        this.cards[i].prio = 1;
        this.app.tween(this.cards[i])
        .to({zoomLevel: 1.4}, 0.2)
      } else {
        this.cards[i].prio = 0;
        this.app.tween(this.cards[i])
        .to({zoomLevel: 1}, 0.2)
      }
    }
  },

  render: function() {
    this.app.layer.clear("#333");
    this.displayDeck();
    this.app.layer.fillStyle("white");
    // this.app.layer.fillRect(this.app.width/2, 0, 2, this.app.height);
  }
}