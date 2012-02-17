this.PATHS = [
    // -system-
    {"type": "js", "url": "lib/json2.js", "buildTo": "build/helper.js", "build": "jsc"},
    {"type": "js", "url": "lib/jquery.1.7.1.js", "buildTo": "build/jquery.1.7.1.js"},
    {"type": "js", "url": "lib/jquery-ui-1.8.17.custom.min.js", "buildTo": "build/jquery-ui-1.8.17.custom.min.js"},
    {"type": "js", "url": "lib/underscore.1.3.1.js", "buildTo": "build/underscore.1.3.1.js"},
    {"type": "js", "url": "lib/backbone.0.9.1.js", "buildTo": "build/backbone.0.9.1.js"},
    {"type": "js", "url": "lib/backbone.l10n.js", "buildTo": "build/backbone.plugins.js", "build": "jsc"},
    {"type": "js", "url": "lib/backbone.collection.search.js", "buildTo": "build/backbone.plugins.js", "build": "jsc"},
    
    // -search-
    {"type": "ajax", "url": "app/search/template.search.tpl", "name": "search.search", "buildTo": "build/tmp.js", "build": "tmp"},
    {"type": "ajax", "url": "app/search/template.searchAirport.tpl", "name": "search.airport", "buildTo": "build/tmp.js", "build": "tmp"},
    {"type": "ajax", "url": "app/search/template.searchCountry.tpl", "name": "search.country", "buildTo": "build/tmp.js", "build": "tmp"},
    {"type": "ajax", "url": "app/search/template.searchLoader.tpl", "name": "search.loader", "buildTo": "build/tmp.js", "build": "tmp"},
    {"type": "ajax", "url": "app/search/template.searchLoaderCity.tpl", "name": "search.loaderCity", "buildTo": "build/tmp.js", "build": "tmp"},
    {"type": "ajax", "url": "app/search/l10n.ru.json", "name": "search.ru", "buildTo": "build/l10n.ru.js", "build": "l10n"},
    {"type": "ajax", "url": "app/search/l10n.ua.json", "name": "search.ua", "buildTo": "build/l10n.ua.js", "build": "l10n"},
    {"type": "js", "url": "app/search/model.search.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/search/view.search.js", "buildTo": "build/app.js", "build": "jsc"},
    
    // -airport-
    {"type": "js", "url": "app/airport/model.country.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/collection.country.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/view.country.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/model.airport.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/collection.airport.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/view.airport.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/model.airports.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/collection.airports.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/airport/view.airport.js", "buildTo": "build/app.js", "build": "jsc"},
    
    {"type": "js", "url": "app/model.router.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/collection.routers.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/router.js", "buildTo": "build/app.js", "build": "jsc"},
    {"type": "js", "url": "app/sync.js", "buildTo": "build/app.js", "build": "jsc"}
];
