this.Tickets.ViewSearch = Backbone.View.extend({
    initialize: function(opt) {
    
        this.router = opt.router;
        this.self = opt.self;
        
        this.model = new this.self.ModelSearch();
        
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
    renderEdit: function() {
        var self = this;
        this.router.collection.get('country').get('view').render({
            success: function(collection, response) {
                self.eventAdd.call(self, self.model);
                collection.each(function(model) {
                    self.eventAddCountryFrom.call(self, model, self.model.get('countryFrom'));
                    self.eventAddCountryTo.call(self, model, self.model.get('countryTo'));
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
        
        var res = this.model.set(data, {error: function(model, error) {
            if(name == 'country-from') {
                $(e.target).val(model.get('countryFrom'));
            } else if(name == 'country-to') {
                $(e.target).val(model.get('countryTo'));
            }
        }});
        
        if(!res) return;
        
        this.router.collection.get('airport').get('view').render(value, {
            success: function(collection, response) {
                if(sel == 'from') {
                    self.eventClearCitysFrom.call(self);
                    collection.each(function(model) {
                        self.eventAddCitysFrom.call(self, model, self.model.get('depairp'));
                    });
                } else if(sel == 'to') {
                    self.eventClearCitysTo.call(self);
                    collection.each(function(model) {
                        self.eventAddCitysTo.call(self, model, self.model.get('arrairp'));
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
        
        this.model.set(data, {error: function(model, error) {
            $(e.target).val(model.get(name));
            console.error(model, error)
        }});
    },
    eventDOMChangeOther: function(e) {
        var name = $(e.target).attr('name'), value = $(e.target).val(), data = {};
        data[name] = value;
        
        this.model.set(data, {error: function(model, error) {
            $(e.target).val(model.get(name));
        }});
    },
    eventDOMBack: function(e) {
        if($(e.target).is(':checked')) {
            this.model.set({type: 'RT'});
            $('[data-id="back"]', this.el).show();
        } else {
            $('[data-id="back"]', this.el).hide();
            this.model.set({type: 'OW'});
        }
    },
    eventDOMDirect: function(e) {
        if($(e.target).is(':checked')) {
            this.model.set({direct: 1});
        } else {
            this.model.set({direct: 0});
        }
    },
    eventDOMClear: function(e) {
        
    },
    eventDOMSearch: function(e) {
        var data = {search: true}
        $('[name]', this.el).each(function() {
            data[$(this).attr('name')] = $(this).val();
        });
        
        var res = this.model.set(data, {error: function(model, error) {
            console.error(model, error);
        }});
        
        console.warn(data, this.model.toJSON());
        
        if(res) {
            //this.router.navigate();
        }
        
    }
});
