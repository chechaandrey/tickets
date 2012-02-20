this.Tickets.ModelResult = Backbone.Model.extend({
    defaults: {
        FlightId: null,
        WebService: null,
        ValCompany: null,
        Refundable: null,
        PricingInfo: null,// collection
        Segments: null,//collection
        TotalPrice: null,
        TotalPriceCurrency: null,
        Charges: null,
        ChargesCurrency: null,
        Commission: null,
        CommissionCurrency: null
    },
    idAttribute: 'FlightId',
    
});
