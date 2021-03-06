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

const maxRadius = 20;
const minRadius = 4;

var geocoderCache = {
    "Магадан":[59.568164,150.808541],"Псков":[57.819365,28.331786],"Пенза":[53.195063,45.018316],
    "Курск":[51.730361,36.192647],"Ростов-на-Дону":[47.222555,39.718678],"Липецк":[52.608782,39.599346],
    "Иркутск":[52.286387,104.28066],"Саранск":[54.187211,45.183642],"Волгоград":[48.707103,44.516939],
    "Омск":[54.989342,73.368212],"Новосибирск":[55.030199,82.92043],"Кемерово":[55.354968,86.087314],
    "Элиста":[46.308309,44.270181],"Ярославль":[57.626569,39.893787],"Томск":[56.48466,84.948179],
    "Абакан":[53.721152,91.442387],"Южно-Сахалинск":[46.959179,142.738041],"Белгород":[50.59566,36.587223],
    "Челябинск":[55.160026,61.40259],"Брянск":[53.243325,34.363731],"Улан-Удэ":[51.834464,107.584574],
    "Нижний Новгород":[56.326887,44.005986],"Тамбов":[52.721219,41.452274],"Санкт-Петербург":[59.939095,30.315868],
    "Нальчик":[43.485278,43.607072],"Петрозаводск":[61.789036,34.359688],"Астрахань":[46.347869,48.033574],
    "Киров":[58.603581,49.667978],"Тверь":[56.859611,35.911896],"Сыктывкар":[61.668724,50.83577],
    "Горно-Алтайск":[51.958182,85.960373],"Петропавловск-Камчатский":[53.03704,158.655918],
    "Магас":[43.166669,44.80484],"Иваново":[57.000348,40.973921],"Курган":[55.441606,65.344316],
    "Саратов":[51.533103,46.034158],"Калуга":[54.513845,36.261215],"Биробиджан":[48.794662,132.921736],
    "Анадырь":[64.734816,177.514745],"Майкоп":[44.609764,40.100516],"Кострома":[57.767961,40.926858],
    "Владивосток":[43.115141,131.885341],"Грозный":[43.317776,45.694909],"Барнаул":[53.348053,83.779875],
    "Ульяновск":[54.316855,48.402557],"Севастополь":[44.616687,33.525432],"Владикавказ":[43.020603,44.681888],
    "Ставрополь":[45.044521,41.969083],"Казань":[55.798551,49.106324],"Чита":[52.033973,113.499432],
    "Махачкала":[42.98306,47.504682],"Воронеж":[51.661535,39.200287],"Самара":[53.195538,50.101783],
    "Москва":[55.753215,37.622504],"Рязань":[54.629148,39.734928],"Владимир":[56.129042,40.40703],
    "Благовещенск":[50.290658,127.527173],"Калининград":[54.70739,20.507307],"Чебоксары":[56.146247,47.250153],
    "Пермь":[58.010374,56.229398],"Оренбург":[51.768199,55.096955],"Салехард":[66.530715,66.613851],
    "Йошкар-Ола":[56.634407,47.899878],"Кызыл":[51.719086,94.437757],"Смоленск":[54.78264,32.045134],
    "Орёл":[52.970143,36.063397],"Краснодар":[45.035566,38.974711],"Мурманск":[68.969582,33.074558],
    "Великий Новгород":[58.52281,31.269915],"Якутск":[62.028103,129.732663],"Ижевск":[56.852593,53.204843],
    "Нарьян-Мар":[67.63805,53.006926],"Екатеринбург":[56.838607,60.605514],"Уфа":[54.735147,55.958727],
    "Хабаровск":[48.480223,135.071917],"Черкесск":[44.226863,42.04677],"Симферополь":[44.948314,34.100156],
    "Тула":[54.193033,37.617752],"Красноярск":[56.010563,92.852572],"Вологда":[59.220473,39.891559]
};

const Api = function(config) {
    this.data = config.data;
    this.geocoder = config.geocoder;
};

Api.prototype.getYearlyData = function(year, regional) {

    const self = this;

    return this.data.getYearlyData(year, regional).then(function(results) {

        const totals = results.map(function(row) { return row.total });

        const max = Math.max.apply(null, totals);
        const min = Math.min.apply(null, totals);

        var obj = {};

        results.forEach(function(row) {

            var okato = row.region.substr(0, 2);
            var city = regionsTable[okato];

            if (city) {
                if (geocoderCache[city]) {

                    const amountData = {
                        radius: self.getRadius(row.total, max, min),
                        amount: row.total
                    };

                    const cityData = {
                        uid: okato,
                        name: city,
                        lat: geocoderCache[city][0],
                        lon: geocoderCache[city][1]
                    };

                    if (row.export) {
                        var fullData = Object.assign(cityData, {
                            export: amountData
                        })
                    } else {
                        var fullData = Object.assign(cityData, {
                            import: amountData
                        })
                    }

                    obj[city] = obj[city] || fullData;

                    obj[city] = Object.assign(fullData, obj[city]);

                } else {
                    console.log('geocode is not cached: ' + city);
                }
            } else {
                console.log('unknown OKATO: ' + okato);
            }
        });
        
        var arr = [];

        for (k in obj) {
            arr.push({
                city: {
                    uid: obj[k].uid,
                    name: obj[k].name,
                    lat: obj[k].lat,
                    lon: obj[k].lon
                },
                import: obj[k].import,
                export: obj[k].export
            })
        }

        return arr;
    });

};

Api.prototype.getTotals = function(region) {
    return this.data.getRegionTotals(region).then(function(results) {
        var totals = {};

        results.forEach(function(row) {

            const dataObj = {
                import: 0,
                export: 0
            };

            totals[row.year] = totals[row.year] || Object.assign({
                    countries: {}
            }, dataObj);

            totals[row.year].countries[row.country] = totals[row.year].countries[row.country] || Object.assign({}, dataObj);

            if (row.export) {
                totals[row.year].export += row.total;
                totals[row.year].countries[row.country].export += row.total;
            } else {
                totals[row.year].import += row.total;
                totals[row.year].countries[row.country].import += row.total;
            }
        });

        return totals;
    });
};

Api.prototype.getCategories = function(region) {
    return this.data.getCategories(region).then(function(results) {
        var menu = {};

        results.forEach(function(row) {

            const toplevel = row.tnved.slice(0,2);

            menu[toplevel] = menu[toplevel] || {};

            if (/^\d{2}0*$/.test(row.tnved)) {
                menu[toplevel].name = row.name;
            }
        });

        var menuArr = [];

        for (k in menu) {
            menuArr.push(Object.assign({ uid: k }, menu[k]));
        }

        return menuArr.sort(function(x) {
            return x.name;
        });
    });
};

Api.prototype.getRegionalData = function(region, industryId) {
    return this.data.getRegionalData(region, industryId).then(function(results) {

        const dataObj = {
            import: 0,
            export: 0
        };

        var data = {};

        results.forEach(function(row) {

            data[row.year] = data[row.year] || Object.assign({
                countries: {}
            }, dataObj);

            data[row.year].countries[row.country] = data[row.year].countries[row.country] || Object.assign({}, dataObj);

            if (row.export) {
                data[row.year].export += row.total;
                data[row.year].countries[row.country].export += row.total;
            } else {
                data[row.year].import += row.total;
                data[row.year].countries[row.country].import += row.total;
            }
        });

        return data;
    });
};

Api.prototype.getRadius = function(amount, max, min) {
    const radiusRange = maxRadius - minRadius;
    const amountFraction = (amount - min) / (max - min);

    return minRadius + radiusRange * amountFraction;
};

module.exports = Api;