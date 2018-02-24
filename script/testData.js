class Player {
  getData(data) {
    for(var n in data) {
      this[n] = data[n];
    }
  }
}

ENGINE.testData = {

  create: function() {
    this.player = new Player;
    this.player.getData(this.app.data.testData.player);
    console.log(this.player.name, this.player.class);
  },

  render: function() {
    this.app.layer.clear('#333');
  }
}