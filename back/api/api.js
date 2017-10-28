const Promise = require('bluebird');

const regionsTable = {
    "01":"Барнаул","03":"Краснодар","04":"Красноярск","05":"Владивосток","07":"Ставрополь","08":"Хабаровск",
    "10":"Благовещенск","11":"Нарьян-Мар","12":"Астрахань","14":"Белгород","15":"Брянск","17":"Владимир",
    "18":"Волгоград","19":"Вологда","20":"Воронеж","22":"Нижний Новгород","24":"Иваново","25":"Иркутск",
    "26":"Магас","27":"Калининград","28":"Тверь","29":"Калуга","30":"Петропавловск-Камчатский",
    "32":"Кемерово","33":"Киров","34":"Кострома","36":"Самара","37":"Курган","38":"Курск","40":"Санкт-Петербург",
    "41":"Санкт-Петербург","42":"Липецк","44":"Магадан","45":"Москва","46":"Москва","47":"Мурманск",
    "49":"Великий Новгород","50":"Новосибирск","52":"Омск","53":"Оренбург","54":"Орёл","56":"Пенза",
    "57":"Пермь","58":"Псков","60":"Ростов-на-Дону","61":"Рязань","63":"Саратов","64":"Южно-Сахалинск",
    "65":"Екатеринбург","66":"Смоленск","68":"Тамбов","69":"Томск","70":"Тула","71":"Салехард","73":"Ульяновск",
    "75":"Челябинск","76":"Чита","77":"Анадырь","78":"Ярославль","79":"Майкоп","80":"Уфа","81":"Улан-Удэ",
    "82":"Махачкала","83":"Нальчик","84":"Горно-Алтайск","85":"Элиста","86":"Петрозаводск","87":"Сыктывкар",
    "88":"Йошкар-Ола","89":"Саранск","90":"Владикавказ","91":"Черкесск","92":"Казань","93":"Кызыл","94":"Ижевск",
    "95":"Абакан","96":"Грозный","97":"Чебоксары","98":"Якутск","99":"Биробиджан","35":"Симферополь","67":"Севастополь"
};

const maxRadius = 500;
const minRadius = 50;

var geocoderCache = {};

const Api = function(config) {
    this.data = config.data;
    this.geocoder = config.geocoder;
};

Api.prototype.getImports = function(year) {
    return this.getYearlyData(year, 'ИМ');
};

Api.prototype.getExports = function(year) {
    return this.getYearlyData(year, 'ЭК');
};

Api.prototype.getYearlyData = function(year, direction) {

    const self = this;

    return this.data.getYearlyData(year, direction).then(function(results) {
        const totals = results.map(function(row) { return row.total });

        const max = Math.max.apply(null, totals);
        const min = Math.min.apply(null, totals);

        return Promise.map(results, function(row) {

            var okato = row.region.substr(0, 2);
            var city = regionsTable[okato];

            if (city) {
                if (geocoderCache[city]) {
                    return {
                        city: {
                            uid: okato,
                            name: city,
                            lat: geocoderCache[city][0],
                            lon: geocoderCache[city][1]
                        },
                        radius: self.getRadius(row.total, max, min),
                        amount: row.total
                    }
                } else {
                    return self.geocoder.geocode([city]).then(function(geocodeResult) {
                        geocoderCache[city] = geocodeResult.result.features[0].geometry.coordinates;
                        return {
                            city: {
                                uid: okato,
                                name: city,
                                lat: geocoderCache[city][0],
                                lon: geocoderCache[city][1]
                            },
                            radius: self.getRadius(row.total, max, min),
                            amount: row.total
                        }
                    })
                }
            } else {
                console.log('unknown OKATO: ' + okato);
            }
         });
    });

};

Api.prototype.getRadius = function(amount, max, min) {
    const radiusRange = maxRadius - minRadius;
    const amountFraction = (amount - min) / (max - min);

    return minRadius + radiusRange * amountFraction;
};

module.exports = Api;