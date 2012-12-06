var
  // Initialize the application and load bootstrapped
  // data and configuration settings.
  app = require('./bootstrap'),

  collection = require('./guestlistcollection'),
  view = require('./guestlistview'),

  $ = app.$,
  $container = $('#container');

(function init() {

  var guestlist = collection.create(),
    guestlistView = view.create(container);

  // Attach it to the DOM first.
  $container.empty().append(guestlistView.$el);

  // Then call render on the view.
  guestlistView.render(guestlist);

}());