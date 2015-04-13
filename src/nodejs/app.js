"use strict";

require('admin/admin');
var r = require('services/exchangeRates');

var t = r.calc('eur', 50000);
console.log(t);