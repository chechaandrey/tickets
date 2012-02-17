Backbone.sync = function(method, model, options) {
    options = options || {};
    var data = {};
    
    if(model && typeof model.prepare == 'function') data = model.prepare(method) || {};
    
    options.data = options.data || {};
    
    $.extend(data, options.data);
    
    if(typeof options.loader == 'function') options.loader.call(this, 0);// progress
    
    if(window.console && window.Tickets.Settings.debug) console.log('Backbone.sync REQUEST: %o', jQuery.param(data));
    
    $.ajax({
        url: window.Tickets.Settings.url,
        dataType: 'xml',
        type: window.Tickets.Settings.method,
        data: data,
        success: function(data, textStatus, jqXHR) {// jqXHR.responseText
            
            data = data || {};
            
            var data1 = {};
            
            if(data.getElementsByTagName("Error").length) {
                if(typeof model.parseError == 'function') data1 = model.parseError.call(this, data, jqXHR, method);
                if(typeof options.error == 'function') options.error.call(this, data1);
            } else if(data.getElementsByTagName("Response").length) {
                if(typeof model.parseSuccess == 'function') data1 = model.parseSuccess.call(this, data, jqXHR, method);
                if(typeof options.success == 'function') options.success.call(this, data1);
            }
                    
            if(window.console && window.Tickets.Settings.debug) console.log('Backbone.sync RESPONCE: %o', data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Backbone.sync($.ajax) error: textStatus: %o; responseText: %o;', textStatus, jqXHR.responseText);
        },
        complete: function() {
            if(typeof options.loader == 'function') options.loader.call(this, 1);// progress
        }
    });
    
}
