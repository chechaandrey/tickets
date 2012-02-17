this.Tickets.ModelAirports = Backbone.Model.extend({
    defaults: {
        countryCode: null,
        citys: null// collection
    },
    idAttribute: 'countryCode'
});
