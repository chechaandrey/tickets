Backbone.View.prototype.mget = function(id) {
    var model = this.models.get(id);
    if(!model) return false;
    return model.get('model');
}

Backbone.View.prototype.mset = function(id, model) {
    var data = {};
    data.id = id;
    if(model) data.model = new model();
    this.models.add(data);
}

Backbone.View.prototype.models = new (Backbone.Collection.extend({
    model: (Backbone.Model.extend({
        defaults: {
            id: 0,
            model: null
        },
        idAttribute: 'id'
    }))
}))();

Backbone.View.prototype.cget = function(id) {
    var model = this.collections.get(id);
    if(!model) return false;
    return model.get('collection');
}

Backbone.View.prototype.cset = function(id, collection, opts) {
    var data = {};
    data.id = id;
    if(collection) data.collection = new collection();
    this.collections.add(data);
}

Backbone.View.prototype.collections = new (Backbone.Collection.extend({
    model: (Backbone.Model.extend({
        defaults: {
            id: 0,
            collection: null
        },
        idAttribute: 'id'
    }))
}))();
