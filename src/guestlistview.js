var app = require('./tinyapp'),

  // Assign Backbone.View to the View var.

  View = require('backbone-browserify').View,
  template = require('underscore').template,
  
  $ = app.$,
  checkedinClass = 'icon-check',
  listClass = 'dropdown-menu',
  guestClass = 'guest',


  // Rebroadcast DOM click events on the app event
  // aggregator.

  relayClick = function relayClick(e) {

    // Get the ID from the element and use it to
    // namespace the event.

    var sourceId = $(this).attr('id'),
      event = app.extend(e, {
        sourceId: $(this).attr('id')
      });

    app.trigger('toggled-checkedin', event);
  },

  delegate = function delegate() {

    // Delegate all click events to the parent element.

    this.$el.on('click', '.' + guestClass, relayClick);

    // Listen for changed events from the model
    // and make sure the element reflects the current
    // state.

    app.on('changed.checkedIn', function changeHandler(event) {
      var id = event.id;


      // Select the right list item by id.

      this.$el.find('#' + id)
        .toggleClass(checkedinClass, event.checkedIn);

    }.bind(this));
  },

  render = function render(guestlist) {
    var $el = this.$el,

      // Compile the guest template.
      guestTemplate = template($('#guestTemplate').html());

    $el.empty();


    // Loop over the passed-in guest models and render
    // them as li elements.
    guestlist.forEach(function (guestModel) {
      var guest;

      // Build the data object to pass into the template.
      guest = guestModel.toJSON();

      // Add the guestClass to the data object.
      guest.guestClass = guestClass;

      // Process the template data and append the output to the
      // list element.
      $el.append(guestTemplate(guest));
    });

    return this;
  },

  // Define the backbone view.
  GuestlistView = View.extend({
    tagName: 'ol',
    id: 'guestlist-view',
    className: listClass,
    initialize: delegate,
    render: render
  }),

  // Expose a factory function.
  create = function create() {
    return new GuestlistView();
  },

  api = {
    create: create
  };

module.exports = api;
