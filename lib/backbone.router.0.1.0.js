Backbone.Router.prototype.add = function(id, ctrl, opts) {
    opts = opts || {};
    var data = {};
    $.extend(data, opts);
    data.id = id;
    opts.router = this;
    data.ctrl = new ctrl(opts);
    if(data.deathtime) data.deathtime = (new Date()).getTime()+parseInt(data.deathtime)*1000; else delete data.deathtime;
    this.ctrl.add(data);
}

Backbone.Router.prototype.remove = function(id) {
    var model;
    if(typeof id == 'function') {
        model = this.ctrl.get('ctrl', id);
    } else {
        model = this.ctrl.get(id);
    }
    if(model) model.remove();
}

Backbone.Router.prototype.get = function(id) {
    var model = this.ctrl.get(id);
    if(!model) return false;
    var dt = model.get('deathtime');
    if(dt && dt > 0) {
        if((new Date()).getTime() > dt) {
            this.remove(id);
            return null;
        } else {
            return model.get('ctrl');
        }
    }
    return model.get('ctrl');
}

Backbone.Router.prototype.hide = function(ids) {
    ids = (ids instanceof Array)?ids:[ids];
    this.ctrl.each(function(model) {
        if(!_.include(ids, model.get('id'))) $(model.get('el')).hide();
    });
}

Backbone.Router.prototype.show = function(ids) {
     ids = (ids instanceof Array)?ids:[ids];
     this.ctrl.each(function(model) {
        if(_.include(ids, model.get('id'))) $(model.get('el')).show();
     });
}

Backbone.Router.prototype.ctrl = new (Backbone.Collection.extend({
    model: (Backbone.Model.extend({
        defaults: {
            id: 0,
            el: null,
            ctrl: null,
            deathtime: null
        },
        idAttribute: 'id'
    }))
}))();
