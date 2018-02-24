PLAYGROUND.Transitions.fade = function(app, progress, screenshot) {
  // body...
  app.layer.a(1 - progress);

  app.layer.drawImage(screenshot, 0, 0);

  /* restore alpha to previous value */
  app.layer.ra();

};

