this.Tickets.ViewSearch = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.mset('m', this.self.ModelSearch);
        
    },
    eventAdd: function(model) {
        $(this.el).html(this.statsTemplate['search'].call(this, model.toJSON()));
        $('#ticketsSearchLabel', this.el).trigger('change');
        var dp0 = $('[data-name="altdepdate"]', this.el).datepicker({
            minDate: 0,
            altField: $('[name="depdate"]', this.el),
            altFormat: 'yy-mm-ddT00:00:00',
            dateFormat: 'dd.mm.yy',
            defaultDate: null,
            hideIfNoPrevNext: true,
            onSelect: function(selectedDate) {
                dp1.datepicker( "option", "minDate", selectedDate);
            }
        });
        var dp1 = $('[data-name="altarrdate"]', this.el).datepicker({
            minDate: 0,
            altField: $('[name="arrdate"]', this.el),
            altFormat: 'yy-mm-ddT00:00:00',
            dateFormat: 'dd.mm.yy',
            defaultDate: null,
            hideIfNoPrevNext: true,
            onSelect: function(selectedDate) {
                dp0.datepicker( "option", "maxDate", selectedDate);
            }
        });
    },
    eventAddCountryFrom: function(model, country) {
        var jdata = model.toJSON();
        jdata['country'] = country;
        $('[data-id="from"] [name="country-from"]', this.el).append(this.statsTemplate['country'].call(this, jdata));
    },
    eventAddCountryTo: function(model, country) {
        var jdata = model.toJSON();
        jdata['country'] = country;
        $('[data-id="to"] [name="country-to"]', this.el).append(this.statsTemplate['country'].call(this, jdata));
    },
    eventAddCitysTo: function(model, city) {
        var jdata = model.toJSON();
        jdata['airport'] = city;
        $('[data-id="to"] [name="arrairp"]', this.el).append(this.statsTemplate['airport'].call(this, jdata));
    },
    eventAddCitysFrom: function(model, city) {
        var jdata = model.toJSON();
        jdata['airport'] = city;
        $('[data-id="from"] [name="depairp"]', this.el).append(this.statsTemplate['airport'].call(this, jdata));
    },
    eventClearCitysTo: function() {
        $('[data-id="to"] [name="arrairp"] [data-name="airport"]', this.el).remove();
    },
    eventClearCitysFrom: function() {
        $('[data-id="from"] [name="depairp"] [data-name="airport"]', this.el).remove();
    },
    eventAddLoader: function() {
        $(this.el).addClass('reading').append(this.statsTemplate['loader'].call(this));
    },
    eventRemoveLoader: function() {
        $(this.el).removeClass('reading');
        $('[data-sync="search"]', this.el).remove();
    },
    eventAddCityLoader: function(sel) {
        $(sel).addClass('reading').append(this.statsTemplate['loaderCity'].call(this));
    },
    eventRemoveCityLoader: function(sel) {
        $(sel).removeClass('reading');
        $('[data-sync="searchCity"]', this.el).remove();
    },
    statsTemplate: {
        'search': _.template(this.Tickets.TEMPLATE['search.search']),
        'airport': _.template(this.Tickets.TEMPLATE['search.airport']),
        'country': _.template(this.Tickets.TEMPLATE['search.country']),
        'loader': _.template(this.Tickets.TEMPLATE['search.loader']),
        'loaderCity': _.template(this.Tickets.TEMPLATE['search.loaderCity'])
    },
    l10nHash: {
        'ru': JSON.parse(this.Tickets.L10N['search.ru']),
        'ua': JSON.parse(this.Tickets.L10N['search.ua'])
    },
    render: function() {
        var self = this;
        this.router.get('country').render({
            success: function(collection, response) {
                var model = self.mget('m');
                self.eventAdd.call(self, model);
                collection.each(function(model1) {
                    self.eventAddCountryFrom.call(self, model1, model.get('countryFrom'));
                    self.eventAddCountryTo.call(self, model1, model.get('countryTo'));
                });
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
    },
    renderView: function() {
        var model = this.mget('m'), search = model.get('search');
        if(!search) {
            this.router.navigate("search/", {trigger: true, replace: true});
        } else {
            model.set({search: false});
            return [this.mget('m'), {
                'countryFrom': this.router.get('country').renderGet(model.get('countryFrom')), 
                'countryTo': this.router.get('country').renderGet(model.get('countryTo')),
                'airportFrom': this.router.get('airport').renderGet(model.get('countryFrom'), model.get('depairp')),
                'airportTo': this.router.get('airport').renderGet(model.get('countryTo'), model.get('arrairp')),
            }];
        }
    },
    events: {
        'change [name="country-from"]': 'eventDOMChangeCountry',
        'change [name="country-to"]': 'eventDOMChangeCountry',
        'change [name="depairp"]': 'eventDOMChangeCity',// from
        'change [name="arrairp"]': 'eventDOMChangeCity',// to
        'change [name="passadt"], [name="passcnn"], [name="passinf"], [name="passins"]': 'eventDOMChangeOther',
        'click [data-id="clear"]': 'eventDOMClear',
        'click [data-id="search"]': 'eventDOMSearch',
        'change #ticketsSearchLabel': 'eventDOMBack',
        'change [name="direct"]': 'eventDOMDirect'
    },
    eventDOMChangeCountry: function(e) {
        var self = this, name = $(e.target).attr('name'), value = $(e.target).val(), $sel, $cloader, data;
        if(name == 'country-from') {
            sel = 'from';
            $cloader = $('[data-id="from"] [data-id="airport"]', this.el);
            data = {countryFrom: value};
        } else if(name == 'country-to') {
            sel = 'to';
            $cloader = $('[data-id="to"] [data-id="airport"]', this.el);
            data = {countryTo: value};
        }
        
        var res = this.mget('m').set(data, {error: function(model, error) {
            if(name == 'country-from') {
                $(e.target).val(model.get('countryFrom'));
            } else if(name == 'country-to') {
                $(e.target).val(model.get('countryTo'));
            }
        }});
        
        if(!res) return;
        
        this.router.get('airport').render(value, {
            success: function(collection, response) {
                if(sel == 'from') {
                    self.eventClearCitysFrom.call(self);
                    collection.each(function(model) {
                        self.eventAddCitysFrom.call(self, model, self.mget('m').get('depairp'));
                    });
                } else if(sel == 'to') {
                    self.eventClearCitysTo.call(self);
                    collection.each(function(model) {
                        self.eventAddCitysTo.call(self, model, self.mget('m').get('arrairp'));
                    });
                }
            },
            error: function(collection, error) {
                console.error(collection, error);
            },
            loader: function(progress) {
                if(progress == 0) {
                    self.eventAddCityLoader.call(self, $cloader);
                } else if(progress == 1) {
                    self.eventRemoveCityLoader.call(self, $cloader);
                }
            }
        });
    },
    eventDOMChangeCity: function(e) {
        var name = $(e.target).attr('name'), value = $(e.target).val(), data = {};
        data[name] = value;
        
        this.mget('m').set(data, {error: function(model, error) {
            $(e.target).val(model.get(name));
            console.error(model, error)
        }});
    },
    eventDOMChangeOther: function(e) {
        var name = $(e.target).attr('name'), value = $(e.target).val(), data = {};
        data[name] = value;
        
        this.mget('m').set(data, {error: function(model, error) {
            $(e.target).val(model.get(name));
        }});
    },
    eventDOMBack: function(e) {
        if($(e.target).is(':checked')) {
            this.mget('m').set({type: 'RT'});
            $('[data-id="back"]', this.el).show();
        } else {
            $('[data-id="back"]', this.el).hide();
            this.mget('m').set({type: 'OW'});
        }
    },
    eventDOMDirect: function(e) {
        if($(e.target).is(':checked')) {
            this.mget('m').set({direct: 1});
        } else {
            this.mget('m').set({direct: 0});
        }
    },
    eventDOMClear: function(e) {
        
    },
    eventDOMSearch: function(e) {
        var data = {search: true}
        $('[name]', this.el).each(function() {
            data[$(this).attr('name')] = $(this).val();
        });
        
        var res = this.mget('m').set(data, {error: function(model, error) {
            console.error(model, error);
        }});
        
        if(res) {
            this.router.navigate("result/", {trigger: true, replace: true});
        }
        
    }
});
