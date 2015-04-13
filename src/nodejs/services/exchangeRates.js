"use strict";

var request = require('request');
var log = require("util/logger")(module);
var parseString = require('xml2js').parseString;

var ExchangeRates = function () {

    this.rates = [];
    this.loadSetting(function () {

    });

    this.update(function (err, result) {

    });

    this._getCBRRates(function (err, result) {
        console.log(err, result);
    });

    this.setCurrentRates();

};

ExchangeRates.prototype.update = function (cb) {

};

ExchangeRates.prototype.loadSetting = function (cb) {
    this.setting = {
        cbr: true,
        allowance: 1.1,
        rates: {
            usd: 35.5,
            eur: 41.2
        }
    };
};

/**
 * Загрузка курсов Доллара США и Евро с банка ЦБР
 * @param cb
 */
ExchangeRates.prototype._getCBRRates = function (cb) {
    request({
        uri: 'http://www.cbr.ru/scripts/XML_daily.asp',
        method: 'GET'
    }, function (err, response, body) {
        if (err || response.statusCode !== 200) {
            log.error('not found XML of exchange rates', err);
            cb(err);
            return err;
        }
        parseString(body, function (err, json) {
            var date, usd, eur;
            if (err) {
                log.error('cannot parse xml');
                cb(err);
                return err;
            }
            if (json.hasOwnProperty('ValCurs') && json.ValCurs.hasOwnProperty('$') && json.ValCurs.$.hasOwnProperty('Date')) {
                date = json.ValCurs.$.Date;
                if (json.ValCurs.hasOwnProperty('Valute')) {
                    json.ValCurs.Valute.forEach(function (val) {
                        switch (val.CharCode[0]) {
                            case 'USD':
                                usd = val.Value[0];
                                break;
                            case 'EUR':
                                eur = val.Value[0];
                                break;
                        }
                    });
                    if (date && eur && usd) {
                        cb(null, {
                            date: date,
                            eur: eur,
                            usd: usd
                        });
                    } else {
                        cb(new Error('Not Found Rates'));
                    }
                }
            } else {
                log.error('xml not correct');
                cb(err);
                return err;
            }

        });
    });
};


ExchangeRates.prototype.setCurrentRates = function () {
    this.rates = this.setting.rates;
};

/**
 * Перевод рублей в USD или EUR
 * @param type: 'usd' || 'eur'
 * @param rub
 * @returns {string}
 */
ExchangeRates.prototype.calc = function (type, rub) {
    var rates = (this.rates.hasOwnProperty(type)) ? this.rates[type] : 1,
        value = (rub) ? rub : 1;

    return (value / rates).toFixed(2);
};


module.exports = new ExchangeRates();