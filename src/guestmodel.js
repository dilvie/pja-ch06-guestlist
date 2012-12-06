var Model = require('backbone-browserify').Model,
  app = require('./bootstrap'),

  // Set the checkedIn attribute on the model.
  toggleCheckedIn = function toggleCheckedIn() {
    this.set('checkedIn', !this.get('checkedIn'));
  },

  delegate = function delegate() {
    var sourceId = this.get('id');

    // Listen for clicked event, sent from the view.
    // sourceId is used to namespace the event. The model
    // does not need to know where the event comes from --
    // only which item was clicked.
    app.on('clicked', sourceId, toggleCheckedIn.bind(this));

    // Relay the change event so the view can listen for it
    // without knowing anything about the model.
    this.on('change:checkedIn', function (item) {

      // Send a shallow copy of the list item as the
      // message payload. Make sure the new checkedIn
      // state is easy to access.
      var event = app.extend({}, item, {
        sourceId: this.id,
        checkedIn: item.get('checkedIn')
      });

      // Broadcast the message on the app-wide event aggregator.
      app.trigger('changed', event);
    }.bind(this));  
  },

  api = Model.extend({
    initialize: delegate,
    toggleCheckedIn: toggleCheckedIn
  });

module.exports = api;
