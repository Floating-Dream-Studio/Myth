var ENGINE = {};

var app = playground({

  //SET SIZE
  width: 1920,
  height: 1080,

  create: function() {
    this.loadImages(
      "CARD_TEST_2",
      "CARD_TEST_3",
      "MAP1"
    );
    this.loadData("testData", "map");
  },

  // keydown: function(e) {
  //   switch(e.key) {
  //     case "numpad1":
  //       this.setState(ENGINE.start_map);
  //       break;
  //     case "numpad2":
  //       this.setState(ENGINE.duel);
  //       break;
  //     case "numpad3":
  //       this.setState(ENGINE.testData);
  //       break;
  //   }
  // },

  ready: function() {
    this.transition = "fade";
    this.setState(ENGINE.menu);
  },

  render: function() {
    this.layer.clear("#333");
    this.layer.fillStyle("white");
    this.layer.font("32px Arial");

    this.layer.fillText("1: start_map", 400, 400);
    this.layer.fillText("2: duel", 400, 450);
    this.layer.fillText("3: testData", 400, 500);
  }

});