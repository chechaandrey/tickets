this.Tickets.ModelSearch = Backbone.Model.extend({
    defaults: {
        countryFrom: null,
        depairp: null,
        countryTo: null,
        arrairp: null,
        passadt: 1,
        passcnn: 0,
        passinf: 0,
        passins: 0,
        depdate: null,
        arrdate: null,
        classflight: 'all',
        type: 'RT',
        direct: 0,
        
        linkonly: 0,
        arounddates: 3,
        onlyavail: 1,
        
        search: false
    },
    validate: function(attrs) {
        if(attrs.countryFrom !== null && !attrs.countryFrom) return {attr: 'countryFrom'};
        if(attrs.countryTo !== null && !attrs.countryTo) return {attr: 'countryTo'};
        if(attrs.arrairp !== null && !attrs.arrairp) return {attr: 'arrairp'};
        if(attrs.depairp !== null && !attrs.depairp) return {attr: 'depairp'};
    }
});
