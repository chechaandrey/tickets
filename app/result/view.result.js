this.Tickets.ViewResult = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.cset('c', this.self.CollectionResult);
        
    },
    eventAdd: function(model) {
        $(this.el).html(this.statsTemplate['result'].call(this, model.toJSON()));
    },
    statsTemplate: {
        'result': _.template(this.Tickets.TEMPLATE['result.result'])
    },
    render: function() {
        var res = this.router.get('search').renderView();
        if(!res) return;
        this.eventAdd.call(this, res);
    }
});
