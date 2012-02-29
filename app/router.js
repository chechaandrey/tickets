this.Tickets.Router = Backbone.Router.extend({
    initialize: function(opt) {
        
        this.l10nLang = opt.l10nLang || 'en';
        
        this.route(/^(search\/).*$/i, 'search', this.search);
        this.route(/^(result\/([\w\d0-9_-+=&]+)).*$/i, 'result', this.result);
        this.route(/^(result\/).*$/i, 'result', this.result);
        this.route(/^(rule\/([0-9]+)\/([0-9]+)\/).*$/i, 'rule', this.rule);
        this.route(/^(rule\/).*$/i, 'rule', this.rule);
        this.route(/^(pass\/([0-9]+)\/([0-9]+)\/).*$/i, 'pass', this.pass);
        this.route(/^(pass\/).*$/i, 'pass', this.pass);
        
    },
    routes: {
	    "": "search"// default page
    }
});
