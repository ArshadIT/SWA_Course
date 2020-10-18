// Weather Assignment part 1, factory function  
function Event(date, _place) {
    const time = () => date;
    const place = () => _place;
    return {
        time,
        place
    }
}

// datatype
function DataType(_type, _unit) {
    const type = () => _type;
    const unit = () => _unit;
    const setUnit = (__unit) => _unit = __unit;
    return {
        type,
        unit,
        setUnit
    }
}

// weather data
function WeatherData(number, date, place, type, unit) {
    const value = () => number;
    const setValue = (_number) => number = _number;
    return Object.assign({
        value,
        setValue
    }, Event(date, place), DataType(type, unit))
}

// wind 
function Wind(direction, number, date, place, type, unit) {
    const getDirection = () => direction;

    function convertToMPH() {
        return ((number / 1000) / 1.6093) * 3600;
    }

    function convertToMS() {
        return (((number * 1.6093) * 1000) / 60) / 60;
    }
    return Object.assign({ 
        getDirection,
        convertToMPH,
        convertToMS
    }, WeatherData(number, date, place, type, unit))
}


// temperature
function Temperature(number, date, place, type, unit) {
    function convertToF() {
        return number * 9 / 5 + 32;
    }

    function convertToC() {
        return (number - 32) * 5 / 9;
    }
    return Object.assign({
        convertToF,
        convertToC
    }, WeatherData(number, date, place, type, unit))
}

// precipitation

function Precipitation(precType, number, date, place, type, unit) {
    const precipitationType = () => precType;

    function convertToInches() {
        return number * 25.4;
    }

    function convertToMM() {
        return number / 25.4;
    }
    return Object.assign({
        precipitationType,
        convertToInches,
        convertToMM
    }, WeatherData(number, date, place, type, unit))
}

// cloud covarage

function CloudCovarage(number, date, place, type, unit) {
    return Object.assign({}, WeatherData(number, date, place, type, unit))
}

// dateinterval 

function DateInterval(dateFrom, dateTo) {
    const from = () => dateFrom;
    const to = () => dateTo;

    function contains(d) {
        return (d >= dateFrom && d <= dateTo)
    }
    return {
        from,
        to,
        contains
    }
}

// weather history
function WeatherHistory(weatherDataCollection) {
    let place;
    let type;
    let period;
    const getCurrentPlace = () => place;
    const setCurrentPlace = (_place) => place = _place;
    const clearCurrentPlace = () => {
        place = undefined;
    };
    const getCurrentType = () => type;
    const setCurrentType = (_type) => type = _type;
    const clearCurrentType = () => {
        type = undefined
    };
    const getCurrentPeriod = () => period;
    const setCurrentPeriod = (_period) => period = _period;
    const clearCurrentPeriod = () => {
        period = undefined
    };

    const convertToUSUnits = () => {
        for (i = 0; i < weatherDataCollection.length; i++) {
            if (weatherDataCollection[i].unit() === "C") {
                newValue = weatherDataCollection[i].value() * 9 / 5 + 32;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('F')

            } else if (weatherDataCollection[i].unit() === 'MS') {
                newValue = ((weatherDataCollection[i].value() / 1000) / 1.6093) * 3600;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('MPH')

            } else if (weatherDataCollection[i].unit() === 'MM') {
                newValue = weatherDataCollection[i].value() * 25.4;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('Inches')
            } else {
                return undefined;
            }
        }
    };

    const convertToInternationalUnits = () => {
        for (i = 0; i < weatherDataCollection.length; i++) {
            if (weatherDataCollection[i].unit() === "F") {
                newValue = (weatherDataCollection[i].value() - 32) * 5 / 9;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('C')

            } else if (weatherDataCollection[i].unit() === 'MPH') {
                newValue = (((weatherDataCollection[i].value() * 1.6093) * 1000) / 60) / 60;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('MS')

            } else if (weatherDataCollection[i].unit() === 'Inches') {
                newValue = weatherDataCollection[i].value() / 25.4;
                weatherDataCollection[i].setValue(newValue);
                weatherDataCollection[i].setUnit('MM')

            } else {
                return undefined
            }
        }
    };

    const add = (data) => weatherDataCollection.push(data);

    function data() {
        for (let i = 0; i < weatherDataCollection.length; i++) {
            console.log(`City: ${weatherDataCollection[i].place()}| Date: ${weatherDataCollection[i].time()}| Type: ${weatherDataCollection[i].type()}| Value: ${weatherDataCollection[i].value()}| Unit: ${weatherDataCollection[i].unit()}`)
        }
    }

    return {
        getCurrentPlace,
        setCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        setCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        setCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        add,
        data
    }
}

// prediction
function WeatherPrediction(date, _to, _from, place, type, unit) {
    const matches = (data) => {
        return (data.value() >= this.to && data.value() <= this.from &&
            data.type === this.type && data.place === this.place &&
            data.unit === this.unit);
    };

    const to = () => _to;
    const from = () => _from;
    const setTo = (__to) => _to = __to;
    const setFrom = (__from) => _from = __from;

    return Object.assign({
        matches,
        to,
        from,
        setTo,
        setFrom
    }, Event(date, place), DataType(type, unit))
}


// temperature prediction
function TemperaturePrediction(date, to, from, place, type, unit) {
    function convertToF() {
        to = to * 9 / 5 + 32;
        from = from * 9 / 5 + 32;
        return 'To: ' + to + ' From: ' + from;
    }

    function convertToC() {
        to = (to - 32) * 5 / 9;
        from = (from - 32) * 5 / 9;
        return 'To: ' + to + ' From: ' + from;
    }
    return Object.assign({
        convertToF,
        convertToC
    }, WeatherPrediction(date, to, from, place, type, unit))
}

// precipitation prediction
function PrecipitationPrediction(types, date, to, from, place, type, unit) {
    const Types = () => types;
    const matches = (data) => {
        return (data.value() >= this.to && data.value() <= this.from &&
            data.type === this.type && data.place === this.place &&
            data.unit === this.unit);
    };

    function convertToInches() {
        to = to * 25.4;
        from = from * 25.4;
        return 'To: ' + to + ' From: ' + from;
    }

    function convertToMM() {
        to = to / 25.4;
        from = from / 25.4;
        return 'To: ' + to + ' From: ' + from;
    }
    return Object.assign({
        Types,
        matches,
        convertToInches,
        convertToMM
    }, WeatherPrediction(date, to, from, place, type, unit))
}

// wind prediction 
function WindPrediction(windDirections, date, to, from, place, type, unit) {
    const directions = () => windDirections;
    const matches = (data) => {
        return (data.value() >= this.to && data.value() <= this.from &&
            data.type === this.type && data.place === this.place &&
            data.unit === this.unit);
    };

    function convertToMPH() {
        to = ((to / 1000) / 1.6093) * 3600;
        from = ((to / 1000) / 1.6093) * 3600;
        return 'To: ' + to + ' From: ' + from;
    }

    function convertToMS() {
        to = (((to * 1.6093) * 1000) / 60) / 60;
        from = ((from / 1000) / 1.6093) * 3600;
        return 'To: ' + to + ' From: ' + from;
    }
    return Object.assign({
        directions,
        matches,
        convertToMPH,
        convertToMS
    }, WeatherPrediction(date, to, from, place, type, unit))
}

// cloud covarage prediction
function CloudCovaragePrediction(date, to, from, place, type, unit) {
    const matches = (data) => {
        return (data.value() >= this.to && data.value() <= this.from &&
            data.type === this.type && data.place === this.place &&
            data.unit === this.unit);
    };
    return Object.assign({
        matches
    }, WeatherPrediction(date, to, from, place, type, unit))
}

// weather forecast
function WeatherForecast(weatherDataCollection) {
    let place;
    let type;
    let period;
    const getCurrentPlace = () => place;
    const setCurrentPlace = (_place) => place = _place;
    const clearCurrentPlace = () => {
        place = undefined;
    };
    const getCurrentType = () => type;
    const setCurrentType = (_type) => type = _type;
    const clearCurrentType = () => {
        type = undefined
    };
    const getCurrentPeriod = () => period;
    const setCurrentPeriod = (_period) => period = _period;
    const clearCurrentPeriod = () => {
        period = undefined
    };

    const convertToUSUnits = () => {
        for (i = 0; i < weatherDataCollection.length; i++) {
            if (weatherDataCollection[i].unit() === "C") {
                newTo = weatherDataCollection[i].to() * 9 / 5 + 32;
                newFrom = weatherDataCollection[i].from() * 9 / 5 + 32;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('F')
            } else if (weatherDataCollection[i].unit() === 'MS') {
                newTo = ((weatherDataCollection[i].to() / 1000) / 1.6093) * 3600;
                newFrom = ((weatherDataCollection[i].from() / 1000) / 1.6093) * 3600;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('MPH')
            } else if (weatherDataCollection[i].unit() === 'MM') {
                newTo = weatherDataCollection[i].to() * 25.4;
                newFrom = weatherDataCollection[i].from() * 25.4;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('Inches')
            } else {
                return 'Undefined unit'
            }
        }
    };

    const convertToInternationalUnits = () => {
        for (i = 0; i < weatherDataCollection.length; i++) {
            if (weatherDataCollection[i].unit() === "F") {
                newTo = (weatherDataCollection[i].to() - 32) * 5 / 9;
                newFrom = (weatherDataCollection[i].from() - 32) * 5 / 9;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('C')

            } else if (weatherDataCollection[i].unit() === 'MPH') {
                newTo = (((weatherDataCollection[i].to() * 1.6093) * 1000) / 60) / 60;
                newFrom = (((weatherDataCollection[i].from() * 1.6093) * 1000) / 60) / 60;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('MS')
            } else if (weatherDataCollection[i].unit() === 'Inches') {
                newTo = weatherDataCollection[i].to() / 25.4;
                newFrom = weatherDataCollection[i].from() / 25.4;
                weatherDataCollection[i].setTo(newTo);
                weatherDataCollection[i].setFrom(newFrom);
                weatherDataCollection[i].setUnit('MM')
            } else {
                return 'Undefined unit'
            }
        }
    };

    const add = (data) => weatherDataCollection.push(data);

    function data() {
        for (let i = 0; i < weatherDataCollection.length; i++) {

            console.log(`City: ${weatherDataCollection[i].place()}| To: ${weatherDataCollection[i].to()}| From: ${weatherDataCollection[i].from()}| Type: ${weatherDataCollection[i].type()}| Unit: ${weatherDataCollection[i].unit()}`)
        }
    }

    return {
        getCurrentPlace,
        setCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        setCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        setCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        add,
        data
    }
}

//dateInterval test
console.log('----dateInterval test----')
let dateFrom = new Date(2019, 04, 16);
let dateTo = new Date();
let date = new Date(2020, 04, 20)
const dint = DateInterval(dateFrom, dateTo)
console.log(dint.contains(date))

// temperature test
console.log('----temperature test----')
const temp = Temperature(10, date, 'Århus', 'Sunny', 'C')
console.log(temp.convertToF(), temp.value())

const tempData = WeatherData(23, date, 'Århus', 'Sunny', 'C')

const tempPred = TemperaturePrediction(date, 4, 10, 'Århus', 'Sunny', 'C');
console.log(tempPred.matches(tempData))
console.log(tempPred.convertToF(), tempPred.to(), tempPred.from())

// precipitation test
console.log('----precipitation test----')
const pre = Precipitation('High', 100, date, 'Århus', 'Rain', 'MM')
console.log(pre.convertToInches(), pre.value())

const preData = WeatherData(60, date, 'Horsens', 'Rain', 'MM')

const prePred = PrecipitationPrediction('High', date, 90, 120, 'Århus', 'Rain', 'MM')
console.log(prePred.matches(preData))
console.log(prePred.convertToInches(), prePred.to(), prePred.from())

// wind test
console.log('----wind test----')
const wind = Wind('east', 26, date, 'Århus', 'Rain', 'MS')
console.log(wind.convertToMPH(), wind.value())

const windData = WeatherData(27, date, 'Horsens', 'Windy', 'MS')

const windPred = WindPrediction('east', date, 26, 29, 'Århus', 'Rain', 'MS')
console.log(windPred.matches(windData))
console.log(windPred.convertToMPH(), windPred.to(), windPred.from())

// cloud covarage test
console.log('----cloud covarage test----')
const cloud = CloudCovarage(0.68, date, 'Århus', 'Sunny', 'Clouds');
console.log(cloud.value())

const CloudData = WeatherData(10, date, 'Viborg', 'Cloudy', 'Clouds')

const cloudPred = CloudCovaragePrediction(date, 0.68, 0.72, 'Århus', 'Sunny', 'Clouds');
console.log(cloudPred.to(), cloudPred.from(), cloudPred.matches(CloudData))

// weather history test
console.log('----weather history test----')

const data1 = new WeatherData(23, date, 'Århus', 'Sunny', 'C')
const data2 = new WeatherData(60, date, 'Horsens', 'Rain', 'C')
const data3 = new WeatherData(10, date, 'Viborg', 'Cloudy', 'MM')

var dataCollection = [data1, data2, data3];

const his = WeatherHistory(dataCollection)
his.add(WeatherData(12, date, his.setCurrentPlace('Århus'), his.setCurrentType('Sunny'), 'MS'))
his.add(WeatherData(12, date, his.setCurrentPlace('Århus'), his.setCurrentType('Sunny'), 'MM'))
his.convertToUSUnits()
his.data()

// weather forcast test
console.log('----weather forcast test----')
const forecast1 = WeatherPrediction(date, 29, 33, 'Århus', 'Sunny', 'C')
const forecast2 = WeatherPrediction(date, 10, 15, 'Horsens', 'Rain', 'C')
const forecast3 = WeatherPrediction(date, 12, 17, 'Viborg', 'Cloudy', 'MM')

var forecastCollection = [forecast1, forecast2, forecast3];

const forecast = WeatherForecast(forecastCollection)
forecast.add(WeatherPrediction(date, -4, 3, 'Viborg', 'Snow', 'MM'))
forecast.convertToUSUnits()
forecast.data()
