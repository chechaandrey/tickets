this.Tickets.Router = Backbone.Router.extend({
    initialize: function(opt) {
    
        this.self = opt.self;
    
        this.l10nLang = opt.l10nLang || 'en';
        
        this.route(/^(search\/).*$/i, 'search', this.search);
        this.route(/^(result\/([a-z0-9]+)\/).*$/i, 'result', this.result);
        this.route(/^(order\/([a-z0-9]+)\/).*$/i, 'order', this.order);
        
        // collection routers
        this.collection = new this.self.CollectionRouters();
    },
    routes: {
	    "": "search"// default page
    },
    search: function(query) {
        this.helperHide();
        this.helperCreateAirport();
        this.helperRenderSearch(true);
        this.helperShow('search');
    },
    result: function(query, id) {
        console.log('RESULT');
    },
    order: function(query, id) {
        
    },
    helperRenderSearch: function(edit) {
        if(!this.collection.get('search')) {
            var el = $('#ticketsSearch');
            this.collection.add({
                id: 'search',
                el: el,
                view: new this.self.ViewSearch({router: this, el: el, self: this.self})
            });
        }
        if(edit) {
            this.collection.get('search').get('view').renderEdit();
        } else {
            this.collection.get('search').get('view').renderView();
        }
    },
    helperCreateAirport: function() {
        if(!this.collection.get('country')) {
            this.collection.add({
                id: 'country',
                view: new this.self.ViewCountry({router: this, self: this.self})
            });
        }
        if(!this.collection.get('airport')) {
            this.collection.add({
                id: 'airport',
                view: new this.self.ViewAirport({router: this, self: this.self})
            });
        }
    },
    helperHide: function(indexs) {
        indexs = (indexs instanceof Array)?indexs:[indexs];
        this.collection.each(function(model) {
            if(!_.include(indexs, model.get('id'))) $(model.get('el')).hide();
        });
    },
    helperShow: function(indexs) {
        indexs = (indexs instanceof Array)?indexs:[indexs];
        this.collection.each(function(model) {
            if(_.include(indexs, model.get('id'))) $(model.get('el')).show();
        });
    }
    
    
    /*
    invoices: function(query, status) {
        //console.log('QUERY: %o; STATUS: %o', query, status);
        
        this.helperRenderGlobalMenu(query);
        
        this.helperHide('globalmenu');
        
        this.helperRenderInvoices(status);
        
        this.helperShow(['invoicesStatus', 'globalmenu']);
        
    },
    buyers: function(query, group) {
        //console.log('QUERY: %o; GROUP: %o', query, group);
        
        this.helperRenderGlobalMenu(query);
        
        this.helperHide('globalmenu');
        
        group = parseInt(group);
        group = group > 0?group:1;
        
        // buyersGroups
        this.helperRenderBuyers(group);
        
        // help
        this.helperRemove('invoiceHelpBuyer');
		
		this.helperShow(['buyers', 'globalmenu']);
        
    },
    goods: function(query, group) {
        //console.log('QUERY: %o; GROUP: %o', query, group);
        
        this.helperRenderGlobalMenu(query);
        
        this.helperHide('globalmenu');
        
        group = group==undefined?1:parseInt(group);
        
        this.helperRenderGoods(group);
        
        // help
        this.helperRemove('invoiceHelpGoods');
        
        this.helperShow(['goods', 'globalmenu']);
        
    },
    iteminvoice: function(query, mod, id) {
        //console.warn('QUERY: %o; ID: %o; MOD: %o', query, id, mod);
        
        this.helperRenderGlobalMenu(query);
        
        this.helperHide('globalmenu');
        
        // help
        this.helperRenderHelpBuyer();
        
        this.helperRenderHelpGoods();
        // help
        
        this.helperRenderInvoice(id, mod);
		
		this.helperShow(['invoice', 'globalmenu']);
        
    },
    merchant: function(query, tab) {
        
        this.helperRenderGlobalMenu(query);
        
        this.helperHide('globalmenu');
        
        if(!this.collection.get('merchant')) this.helperRenderMerchant();
        this.collection.get('merchant').get('view').renderDisplay(tab);
        
        this.helperShow(['merchant', 'globalmenu']);
        
    },
    helperRenderMerchant: function() {
        var el = $('#invoicesMerchant');
        this.collection.add({
            id: 'merchant',
            el: el,
            view: new window.Invoices.ViewMerchant({router: this, el: el})
        });
    },
    helperRenderGlobalMenu: function(query) {
        if(!this.collection.get('globalmenu')) {
            var el = $('#invoicesGlobalMenu');
            this.collection.add({
                id: 'globalmenu',
                el: el,
                view: new window.Invoices.ViewGlobalMenu({router: this, el: el})
            });
		    this.collection.get('globalmenu').get('view').render();
		    this.collection.get('globalmenu').get('view').renderItem(query);
        } else {
            this.collection.get('globalmenu').get('view').renderItem(query);
        }
    },
    helperRenderBuyers: function(group) {
        if(!this.collection.get('buyers')) {
            var el = $('#invoicesClients');
            this.collection.add({
                id: 'buyers',
                el: el,
                view: new window.Invoices.ViewBuyersGroups({router: this, el: el})
            });
		    this.collection.get('buyers').get('view').render(group);
		    this.collection.get('buyers').get('view').renderItem(group);
        } else {
            this.collection.get('buyers').get('view').renderItem(group);
        }
    },
    helperRenderGoods: function(group) {
        if(!this.collection.get('goods')) {
            var el = $('#invoicesPs');
            this.collection.add({
                id: 'goods',
                el: el,
                view: new window.Invoices.ViewGoodsGroups({router: this, el: el})
            });
		    this.collection.get('goods').get('view').render(group);
		    this.collection.get('goods').get('view').renderItem(group);
        } else {
            this.collection.get('goods').get('view').renderItem(group);
        }
    },
    helperRenderInvoices: function(status) {
        if(!this.collection.get('invoicesStatus')) {
            var el = $('#invoicesInvoices');
            this.collection.add({
                id: 'invoicesStatus',
                el: el,
                view: new window.Invoices.ViewInvoicesStatus({router: this, el: el})
            });
		    this.collection.get('invoicesStatus').get('view').render();
		    this.collection.get('invoicesStatus').get('view').renderItem(status);
        } else {
            this.collection.get('invoicesStatus').get('view').renderItem(status);
        }
    },
    helperRenderInvoice: function(id, mod) {
        if(!this.collection.get('invoice')) {
            var el = $('#invoicesItemInvoice');
            this.collection.add({
                id: 'invoice',
                el: el,
                view: new window.Invoices.ViewInvoice({router: this, el: el})
            });
        }
        
        // Fix models
        var collection = this.collection.get('invoice').get('view').collection;
        if(collection.length > 1) {
            collection.each(function(model, index) {
                if(model.id && id && id != model.id) collection.remove(model);
            });
        }
        
        this.collection.get('invoice').get('view').render(id, mod);
        
        // remove buyers, goods
        var buyers = this.collection.get('buyers');
        if(buyers) buyers.get('view').collectionBuyers = new window.Invoices.CollectionRouters();
        
        var goodss = this.collection.get('goods');
        if(goodss) goodss.get('view').collectionGoodss = new window.Invoices.CollectionRouters();
        // remove buyers, goods
    },
    helperRenderHelpBuyer: function() {
        if(!this.collection.get('invoiceHelpBuyer')) {
            this.collection.add({
                id: 'invoiceHelpBuyer',
                view: new window.Invoices.ViewItemInvoiceHelpBuyer({router: this})
            });
        }
    },
    helperRenderHelpGoods: function() {
        if(!this.collection.get('invoiceHelpGoods')) {
            this.collection.add({
                id: 'invoiceHelpGoods',
                view: new window.Invoices.ViewItemInvoiceHelpGoods({router: this})
            });
        }
    },
    helperRemove: function(indexs) {
        indexs = (indexs instanceof Array)?indexs:[indexs];
        for(var i=0; i<indexs.length; i++) {
            var help = this.collection.get(indexs[i]);
            if(help) this.collection.remove(help);
        }
    },
    */
});
