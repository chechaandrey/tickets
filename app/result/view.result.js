this.Tickets.ViewResult = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.cset('c', this.self.CollectionResult);
        
    },
    eventAdd: function(data) {
        var jdata = {};
        jdata = data[0].toJSON();
        for(var i in data[1]) {
            jdata[i] = data[1][i].toJSON();
        }
        console.warn(jdata);
        $(this.el).html(this.statsTemplate['result'].call(this, jdata));
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
