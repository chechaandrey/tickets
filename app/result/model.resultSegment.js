this.Tickets.ModelResultSegment = Backbone.Model.extend({
    defaults: {
        SegNum: null,
        DepAirp: null,
        DepAirpCode: null,
        DepTerminal: null,
        ArrAirp: null,
        ArrAirpCode: null,
        ArrTerminal: null,
        OpAirline: null,
        MarkAirline: null,
        FlightNumber: null,
        AircraftType: null,
        DepDateTime: null,
        ArrDateTime: null,
        BookingCode: [],
        FlightTime: null,
        ETicket: null,
        Departure: null,
        Arrival: null
    },
    idAttribute: 'SegNum'
});
