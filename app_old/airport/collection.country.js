this.Tickets.CollectionCountry = Backbone.Collection.extend({
    model: this.Tickets.ModelCountry,
    initialize: function() {
        
    },
    syncID: 'tickets',
    prepare: function(method) {
        if(method == 'read') return {oper: "countries"};
    },
    parseSuccess: function(doc, xhr, method) {
        var data = [];
        $('country', doc).each(function() {
            data.push({code: $(this).attr('code'), name: $(this).attr('name')})
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
