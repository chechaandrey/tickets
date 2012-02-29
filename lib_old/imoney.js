function iMoney(options) {
    
    options = options || {};
    var imoney = 0;
    
    function __construct(options) {
        this.parse(options);
    }
    
    // property
    this.float = 0;
    this.int = 0;
    this.kopiks = 0;
    
    this.up = function() {
        money = (imoney + '').split('.');
        this.float = imoney;
        this.int = parseInt(money[0]);
        if(!money[1]) money[1] = '';
        while(money[1].length < 2) money[1] += '0';
        this.kopiks = parseInt(money[1].substr(0, 2));
        
        return this;
    }
    
    this.parse = function(money) {
        if(!money) {
            imoney = 0;
        } else {
            money = money + '';
            money = money.replace(/\s+/g, '');
            var inv = '';
            if(/^-/.test(money)) inv = '-';
            money = money.split(/[\.|,|-]{1,}([0-9]*)$/, 2);
            if(!money[0]) money[0] = '0';
            if(!money[1]) money[1] = '00';
            money[0]  = money[0].replace(/[^0-9]+/g, '');
            money[1]  = money[1].replace(/[^0-9]+/g, '');
            money[1] = parseFloat(money[1].substr(0, 2)+'.'+money[1].substr(2));
            imoney = parseFloat(inv+money[0]+'.'+Math.round(money[1]));
        }
        this.up();
        return this;
    }
    
    this.get = function() {
        return imoney;
    }
    
    this.set = function(arg) {
        imoney = (new iMoney(arg)).get();
    }
    
    this.clone = function() {
        return new iMoney(this.get());
    }
    
    this.diff = function(arg) {
        if(!(arg instanceof iMoney)) arg = new iMoney(arg);
        return arg.get() - imoney;
    }
    
    this.idiff = function(arg) {
        if(!(arg instanceof iMoney)) arg = new iMoney(arg);
        return imoney - arg.get();
    }
    
    this.offset = function(arg) {
        if(!(arg instanceof iMoney)) arg = new iMoney(arg);
        imoney = imoney + arg.get();
        return this;
    }
    
    this.getOffset = function(arg) {
		return this.clone().offset(arg);
	}
    
    this.toString = function(decimals, dec_point, thousands_sep) {
        if(decimals == undefined) decimals = 2;
        if(dec_point == undefined) dec_point = '.';
        if(thousands_sep == undefined) thousands_sep = ' ';
        return number_format(imoney, decimals, dec_point, thousands_sep);
    }
    
    __construct.call(this, options);
    
    function number_format(number, decimals, dec_point, thousands_sep) {
        // Formats a number with grouped thousands  
        // 
        // version: 1109.2015
        // discuss at: http://phpjs.org/functions/number_format
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +     bugfix by: Michael White (http://getsprink.com)
        // +     bugfix by: Benjamin Lupton
        // +     bugfix by: Allan Jensen (http://www.winternet.no)
        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +     bugfix by: Howard Yeend
        // +    revised by: Luke Smith (http://lucassmith.name)
        // +     bugfix by: Diogo Resende
        // +     bugfix by: Rival
        // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
        // +   improved by: davook
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Jay Klehr
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Amir Habibi (http://www.residence-mixte.com/)
        // +     bugfix by: Brett Zamir (http://brett-zamir.me)
        // +   improved by: Theriault
        // +      input by: Amirouche
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'
        // *     example 7: number_format(1000.55, 1);
        // *     returns 7: '1,000.6'
        // *     example 8: number_format(67000, 5, ',', '.');
        // *     returns 8: '67.000,00000'
        // *     example 9: number_format(0.9, 0);
        // *     returns 9: '1'
        // *    example 10: number_format('1.20', 2);
        // *    returns 10: '1.20'
        // *    example 11: number_format('1.20', 4);
        // *    returns 11: '1.2000'
        // *    example 12: number_format('1.2000', 3);
        // *    returns 12: '1.200'
        // *    example 13: number_format('1 000,50', 2, '.', ' ');
        // *    returns 13: '100 050.00'
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number)?0:+number,
            prec = !isFinite(+decimals)?0:Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined')?',':thousands_sep,
            dec = (typeof dec_point === 'undefined')?'.':dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return ''+Math.round(n * k)/k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec?toFixedFix(n, prec):''+Math.round(n)).split('.');
        if(s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
    
}
