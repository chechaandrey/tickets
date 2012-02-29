this.Tickets.CollectionResult = Backbone.Collection.extend({
    model: this.Tickets.ModelResult,
    initialize: function() {
        
    },
    syncID: 'tickets',
    prepare: function(method) {
        if(method == 'read') return {oper: "search"};
    },
    parseSuccess: function(doc, xhr, method) {
        var data = [];
        $('Flight[FlightId]', doc).each(function() {
            var models = [], models0 = [];
            
            $('Segments', this).children().each(function() {
                models.push(new window.Tickets.ModelResultSegment({
                    SegNum: $(this).attr('SegNum'),
                    DepAirp: $('DepAirp', this).text(),
                    DepAirpCode: $('DepAirp', this).attr('Type'),
                    DepTerminal: $('DepTerminal', this).text(),
                    ArrAirp: $('ArrAirp', this).text(),
                    ArrAirpCode: $('ArrAirpCode', this).attr('Type'),
                    ArrTerminal: $('ArrTerminal', this).text(),
                    OpAirline: $('OpAirline', this).text(),
                    MarkAirline: $('MarkAirline', this).text(),
                    FlightNumber: $('FlightNumber', this).text(),
                    AircraftType: $('AircraftType', this).text(),
                    DepDateTime: $('DepDateTime', this).text(),
                    ArrDateTime: $('ArrDateTime', this).text(),
                    BookingCode: $('BookingCodes BookingCode', this).toArray(),
                    FlightTime: $('FlightTime', this).text(),
                    ETicket: $('ETicket', this).text()==='true'?true:false,
                    Departure: $('TimeZone', this).attr('Departure'),
                    Arrival: $('TimeZone', this).attr('Arrival')
                }));
            });
            
            data.push({
                FlightId: $(this).attr('FlightId'),
                WebService: $('WebService', this).text(),
                ValCompany: $('ValCompany', this).text(),
                Refundable: $('PricingInfo', this).attr('Refundable'),
                Commission: $('Commission', this).text(),
                CommissionCurrency: $('Commission', this).attr('Currency'),
                TotalPrice: $('TotalPrice', this).text(),
                TotalPriceCurrency: $('TotalPrice', this).attr('Currency'),
                Charges: $('Charges', this).text(),
                ChargesCurrency: $('Charges', this).attr('Currency'),
                Segments: new window.Tickets.CollectionResultSegment(models)
            })
        });
        return data;
    },
    parseError: function(doc, xhr, method) {
        var data = [];
        $('Error', doc).each(function() {
            data.push({code: $('Error', doc).attr('Code')});
        });
        return data;
    }
});
