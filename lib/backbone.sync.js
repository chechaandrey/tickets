Backbone.sync = function(method, model, options) {
    var syncID = model.syncID;
    if(!syncID && syncID !== 0 && model.collection) syncID = model.collection.syncID;
    var m = Backbone.sync.collection.get(syncID);
    if(m) {
        var f = m.get('sync');
        if(typeof f == 'function') {
            
            f.call(this, method, model, options);
            
        }
    } else {
        console.error('for the specified syncID("'+syncID+'") is not registered, not method');
    }
}

Backbone.sync.add = function(id, sync) {
    if(typeof sync == 'function') Backbone.sync.collection.add({id: id, sync: sync});
}

Backbone.sync.remove = function(id) {
    var model;
    if(typeof id == 'function') {
        model = Backbone.sync.collection.get('sync', id);
    } else {
        model = Backbone.sync.collection.get(id);
    }
    if(model) model.remove();
}

Backbone.sync.collection = new (Backbone.Collection.extend({
    model: (Backbone.Model.extend({
        defaults: {
            id: 0,
            sync: null
        },
        idAttribute: 'id'
    }))
}))();
