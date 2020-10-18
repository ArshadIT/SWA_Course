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
    return {
        type,
        unit,
    }
}

// weather data
function WeatherData(number, date, place, type, unit) {
    const value = () => number;
    return Object.assign({
        value,
    }, Event(date, place), DataType(type, unit))
}

// wind 
function Wind(direction, number, date, place, type, unit) {
    const getDirection = () => direction;

    function convertToMPH() {
        newNumber = ((number / 1000) / 1.6093) * 3600
        return Wind(direction, newNumber, date, place, type, unit)
;
    }

    function convertToMS() {
        newNumber = (((number * 1.6093) * 1000) / 60) / 60;
        return Wind(direction, newNumber, date, place, type, unit);
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
        newNumber = number * 9 / 5 + 32
        return Temperature(newNumber, date, place, type, unit);
    }

    function convertToC() {
        newNumber = (number - 32) * 5 / 9;
        return Temperature(newNumber, date, place, type, unit);
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
        newNumber = number * 25.4
        return Precipitation(precType, newNumber, date, place, type, unit);
    }

    function convertToMM() {
        newNumber = number / 25.4
        return Precipitation(precType, newNumber, date, place, type, unit);
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
    const weatherData = [...weatherDataCollection]
    const getCurrentPlace = () => place;
    // const setCurrentPlace = (_place) => place = _place;
    const clearCurrentPlace = () => {
        place = undefined;
    };
    const getCurrentType = () => type;
    // const setCurrentType = (_type) => type = _type;
    const clearCurrentType = () => {
        type = undefined
    };
    const getCurrentPeriod = () => period;
    const setCurrentPeriod = (_period) => period = _period;
    const clearCurrentPeriod = () => {
        period = undefined
    };

    const convertToUSUnits = () => {
        let acc = []
        weatherData.map(d => {
            if (d.unit() === "C") {
                newValue = d.value() * 9 / 5 + 32;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'F')
                acc.push(newObj);
            } else if (d.unit() === 'MS') {
                newValue = ((d.value() / 1000) / 1.6093) * 3600;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'MPH')
                acc.push(newObj);
            } else if (d.unit() === 'MM') {
                newValue = d.value() * 25.4;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'Inches')
                acc.push(newObj);
            } else {
                return undefined;
            }})
            return console.log(acc[0].unit());
    };

    const convertToInternationalUnits = () => {
        let acc = []
        weatherData.map(d => {
            if (d.unit() === "F") {
                newValue = (d.value() - 32) * 5 / 9;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'C')
                acc.push(newObj); 
            } else if (d.unit() === 'MPH') {
                newValue = (((d.value() * 1.6093) * 1000) / 60) / 60;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'MS')
                acc.push(newObj);
            } else if (d.unit() === 'Inches') {
                newValue = d.value() / 25.4;
                newObj = WeatherData(newValue, d.time(), d.place(), d.type(), 'MM')
                acc.push(newObj);
            } else {
                return undefined;
            }})
            return console.log(acc[0].unit());
    };

    const add = (data) => WeatherHistory([...weatherData, data]);

    function data() {
        weatherData.map(d => {
            console.log(`City: ${d.place()}| Date: ${d.time()}| Type: ${d.type()}| Value: ${d.value()}| Unit: ${d.unit()}`)
        })
    }

    return {
        getCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
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
        newTo = to * 9 / 5 + 32;
        newFrom = from * 9 / 5 + 32;
        return TemperaturePrediction(date, newTo, newFrom, place, type, unit);
    }

    function convertToC() {
        newTo = (to - 32) * 5 / 9;
        newFrom = (from - 32) * 5 / 9;
        return TemperaturePrediction(date, newTo, newFrom, place, type, unit);
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
        newTo = to * 25.4;
        newFrom = from * 25.4;
        return PrecipitationPrediction(types, date, newTo, newFrom, place, type, unit);
    }

    function convertToMM() {
        newTo = to / 25.4;
        newFrom = from / 25.4;
        return PrecipitationPrediction(types, date, newTo, newFrom, place, type, unit);
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
        newTo = ((to / 1000) / 1.6093) * 3600;
        newFrom = ((to / 1000) / 1.6093) * 3600;
        return WindPrediction(windDirections, date, newTo, newFrom, place, type, unit);
    }

    function convertToMS() {
        newTo = (((to * 1.6093) * 1000) / 60) / 60;
        newFrom = ((from / 1000) / 1.6093) * 3600;
        return WindPrediction(windDirections, date, newTo, newFrom, place, type, unit);
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
    const weatherData = [...weatherDataCollection];
    const getCurrentPlace = () => place;
    // const setCurrentPlace = (_place) => place = _place;
    const clearCurrentPlace = () => {
        place = undefined;
    };
    const getCurrentType = () => type;
    // const setCurrentType = (_type) => type = _type;
    const clearCurrentType = () => {
        type = undefined
    };
    const getCurrentPeriod = () => period;
    // const setCurrentPeriod = (_period) => period = _period;
    const clearCurrentPeriod = () => {
        period = undefined
    };

    const convertToUSUnits = () => {
        let acc = []
        weatherData.map(d => {
            if (d.unit() === "C") {
                newTo = d.to() * 9 / 5 + 32;
                newFrom = d.from() * 9 / 5 + 32;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'F')
                acc.push(newObj);
            } else if (d.unit() === 'MS') {
                newTo = ((d.to() / 1000) / 1.6093) * 3600;
                newFrom = ((d.from() / 1000) / 1.6093) * 3600;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'MPH')
                acc.push(newObj);
            } else if (d.unit() === 'MM') {
                newTo = d.to() * 25.4;
                newFrom = d.from() * 25.4;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'Inches')
                acc.push(newObj);
            } else {
                return undefined;
            }})
            return console.log(acc[0].unit());
    };

    const convertToInternationalUnits = () => {
        let acc = []
        weatherData.map(d => {
            if (d.unit() === "F") {
                newTo = (d.to() - 32) * 5 / 9;
                newFrom = (d.from() - 32) * 5 / 9;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'C')
                acc.push(newObj);
            } else if (d.unit() === 'MPH') {
                newTo = (((d.to() * 1.6093) * 1000) / 60) / 60;
                newFrom = (((d.from() * 1.6093) * 1000) / 60) / 60;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'MS')
                acc.push(newObj);
            } else if (d.unit() === 'Inches') {
                newTo = d.to() / 25.4;
                newFrom = d.from() / 25.4;
                newObj = WeatherPrediction(d.time(), newTo, newFrom, d.place(), d.type(), 'MM')
                acc.push(newObj);
            } else {
                return undefined;
            }})
            return console.log(acc[0].unit());
    };

    const add = (data) => WeatherPrediction([...weatherData, data]);

    function data() {
        for (let i = 0; i < weatherDataCollection.length; i++) {

            console.log(`City: ${weatherDataCollection[i].place()}| To: ${weatherDataCollection[i].to()}| From: ${weatherDataCollection[i].from()}| Type: ${weatherDataCollection[i].type()}| Unit: ${weatherDataCollection[i].unit()}`)
        }
    }

    return {
        getCurrentPlace,
        clearCurrentPlace,
        getCurrentType,
        clearCurrentType,
        getCurrentPeriod,
        clearCurrentPeriod,
        convertToUSUnits,
        convertToInternationalUnits,
        add,
        data
    }
}

// weather history test
console.log('----weather history test----')
let date = new Date(2020, 04, 20)
const data1 = new WeatherData(23, date, 'Århus', 'Sunny', 'F')
const data2 = new WeatherData(60, date, 'Horsens', 'Rain', 'F')
const data3 = new WeatherData(10, date, 'Viborg', 'Cloudy', 'Inches')

var dataCollection = [data1, data2, data3];

const his = WeatherHistory(dataCollection)
his.convertToInternationalUnits();
newHis = his.add(WeatherData(10, date, 'Viborg', 'Cloudy', 'MM'))
newHis.data()
// his.data()

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


