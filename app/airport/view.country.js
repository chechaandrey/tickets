this.Tickets.ViewCountry = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.collection = null;
        
    },
    render: function(opts) {
        opts = opts || {};
        if(this.collection) {
            if(typeof opts.success == 'function') opts.success.call(this, this.collection);
        } else {
            this.collection = new this.self.CollectionCountry();
            this.collection.fetch({
                data: null,
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
    renderGet: function(code) {
        return this.collection.get('code', code);
    }
});
