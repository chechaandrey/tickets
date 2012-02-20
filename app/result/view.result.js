this.Tickets.ViewResult = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.cset('c', this.self.CollectionResult);
        
        this.cget('c').bind('add', this.eventAddResult, this);
        
    },
    eventAdd: function(model) {
        $(this.el).html(this.statsTemplate['result'].call(this, model.toJSON()));
    },
    eventAddResult: function(model) {
        $('[data-id="content"]', this.el).append(this.statsTemplate['item'].call(this, model.toJSON()));
    },
    eventAddLoader: function() {
        $('[data-id="content"]', this.el).addClass('loading').html(this.statsTemplate['loader'].call(this));
    },
    eventRemoveLoader: function() {
        $('[data-id="content"]', this.el).removeClass('loading');
        $('[data-id="content"] [data-sync="result"]', this.el).remove();
    },
    statsTemplate: {
        'result': _.template(this.Tickets.TEMPLATE['result.result']),
        'item': _.template(this.Tickets.TEMPLATE['result.item']),
        'loader': _.template(this.Tickets.TEMPLATE['result.loader'])
    },
    render: function() {
        var self = this, res = this.router.get('search').renderView();
        if(!res) return;
        this.eventAdd.call(this, res);
        
        this.cget('c').fetch({
            data: {
                linkonly: res.get('linkonly'),
                type: res.get('type'),
                direct: res.get('direct'),
                arounddates: res.get('arounddates'),
                arrairp: res.get('arrairp'),
                depairp: res.get('depairp'),
                arrdate: res.get('arrdate'),
                depdate: res.get('depdate'),
                classflight: res.get('classflight'),
                includefrivatefare: 0,
                onlyavail: res.get('onlyavail'),
                passadt: res.get('passadt'),
                passcnn: res.get('passcnn'),
                passins: res.get('passins'),
                passinf: res.get('passinf')
            },
            add: true,
            success: function(collection) {
                console.log(collection);
            },
            error: function(collection, error) {
                console.error(collection, error);
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddLoader.call(self);
                } else if(progress == 1) {
                    self.eventRemoveLoader.call(self);
                }
            }
        });
    }
});
