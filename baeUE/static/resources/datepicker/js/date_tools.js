/**
 * @author Administrator
 */
Date.prototype.getMonthName = function(fullName){
    return this[fullName ? 'months' : 'monthsShort'][this.getMonth()];
};
Date.prototype.getDayName = function(fullName){
    return this[fullName ? 'days' : 'daysShort'][this.getDay()];
};
Date.prototype.addDays = function(n){
    this.setDate(this.getDate() + n);
    this.tempDate = this.getDate();
};
Date.prototype.addMonths = function(n){
    if (this.tempDate == null) {
        this.tempDate = this.getDate();
    }
    this.setDate(1);
    this.setMonth(this.getMonth() + n);
    this.setDate(Math.min(this.tempDate, this.getMaxDays()));
};
Date.prototype.addYears = function(n){
    if (this.tempDate == null) {
        this.tempDate = this.getDate();
    }
    this.setDate(1);
    this.setFullYear(this.getFullYear() + n);
    this.setDate(Math.min(this.tempDate, this.getMaxDays()));
};
Date.prototype.getMaxDays = function(){
    var tmpDate = new Date(Date.parse(this)), d = 28, m;
    m = tmpDate.getMonth();
    d = 28;
    while (tmpDate.getMonth() == m) {
        d++;
        tmpDate.setDate(d);
    }
    return d - 1;
};
Date.prototype.getFirstDay = function(){
    var tmpDate = new Date(Date.parse(this));
    tmpDate.setDate(1);
    return tmpDate.getDay();
};
Date.prototype.getWeekNumber = function(){
    var tempDate = new Date(this);
    tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
    var dms = tempDate.valueOf();
    tempDate.setMonth(0);
    tempDate.setDate(4);
    return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1;
};
Date.prototype.getDayOfYear = function(){
    var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
    var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
    var time = now - then;
    return Math.floor(time / 24 * 60 * 60 * 1000);
};
var parseDate = function(date, format){
    if (date.constructor == Date) {
        return new Date(date);
    }
    var parts = date.split(/\W+/);
    var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
    for (var i = 0; i < parts.length; i++) {
        switch (against[i]) {
            case 'd':
            case 'e':
                d = parseInt(parts[i], 10);
                break;
            case 'm':
                m = parseInt(parts[i], 10) - 1;
                break;
            case 'Y':
            case 'y':
                y = parseInt(parts[i], 10);
                y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
                break;
            case 'H':
            case 'I':
            case 'k':
            case 'l':
                h = parseInt(parts[i], 10);
                break;
            case 'P':
            case 'p':
                if (/pm/i.test(parts[i]) && h < 12) {
                    h += 12;
                }
                else 
                    if (/am/i.test(parts[i]) && h >= 12) {
                        h -= 12;
                    }
                break;
            case 'M':
                min = parseInt(parts[i], 10);
                break;
        }
    }
    return new Date(y === undefined ? now.getFullYear() : y, m === undefined ? now.getMonth() : m, d === undefined ? now.getDate() : d, h === undefined ? now.getHours() : h, min === undefined ? now.getMinutes() : min, 0);
}
var formatDate = function(date, format){
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();
    var wn = date.getWeekNumber();
    var w = date.getDay();
    var s = {};
    var hr = date.getHours();
    var pm = (hr >= 12);
    var ir = (pm) ? (hr - 12) : hr;
    var dy = date.getDayOfYear();
    if (ir == 0) {
        ir = 12;
    }
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var parts = format.split(''), part;
    for (var i = 0; i < parts.length; i++) {
        part = parts[i];
        switch (parts[i]) {
            case 'a':
                part = date.getDayName();
                break;
            case 'A':
                part = date.getDayName(true);
                break;
            case 'b':
                part = date.getMonthName();
                break;
            case 'B':
                part = date.getMonthName(true);
                break;
            case 'C':
                part = 1 + Math.floor(y / 100);
                break;
            case 'd':
                part = (d < 10) ? ("0" + d) : d;
                break;
            case 'e':
                part = d;
                break;
            case 'H':
                part = (hr < 10) ? ("0" + hr) : hr;
                break;
            case 'I':
                part = (ir < 10) ? ("0" + ir) : ir;
                break;
            case 'j':
                part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
                break;
            case 'k':
                part = hr;
                break;
            case 'l':
                part = ir;
                break;
            case 'm':
                part = (m < 9) ? ("0" + (1 + m)) : (1 + m);
                break;
            case 'M':
                part = (min < 10) ? ("0" + min) : min;
                break;
            case 'p':
            case 'P':
                part = pm ? "PM" : "AM";
                break;
            case 's':
                part = Math.floor(date.getTime() / 1000);
                break;
            case 'S':
                part = (sec < 10) ? ("0" + sec) : sec;
                break;
            case 'u':
                part = w + 1;
                break;
            case 'w':
                part = w;
                break;
            case 'y':
                part = ('' + y).substr(2, 2);
                break;
            case 'Y':
                part = y;
                break;
        }
        parts[i] = part;
    }
    return parts.join('');
}
