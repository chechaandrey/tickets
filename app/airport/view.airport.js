this.Tickets.ViewAirport = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.collection = new this.self.CollectionAirports();
        
    },
    render: function(code, opts) {
        opts = opts || {};
        var sel = this.collection.get(code);
        if(sel) {
            if(typeof opts.success == 'function') opts.success.call(this, sel.get('citys'));
        } else {
            this.collection.add({countryCode: code, citys: new this.self.CollectionAirport()});
            this.collection.get(code).get('citys').fetch({
                data: {countryCode: code},
                error: function(collection, error) {
                    if(typeof opts.error == 'function') opts.error.call(this, collection, error);
                },
                success: function(collection, response) {
                    if(typeof opts.success == 'function') opts.success.call(this, collection, response);
                },
                loader: opts.loader
            });
        }
    },
    renderGet: function(code, codeCity) {
        return this.collection.get(code)
            .get('citys')
            .get('code', codeCity);
    }
});
