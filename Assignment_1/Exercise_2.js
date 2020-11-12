// weather event
class WeatherEvent {
    constructor(date, place, type, unit) {
        this.date = date;
        this.place = place;
        this.type = type;
        this.unit = unit;
    }
}

WeatherEvent.prototype.time = function () {
    return this.date;
}

WeatherEvent.prototype.place = function () {
    return this.place;
}

WeatherEvent.prototype.type = function () {
    return this.type;
}

WeatherEvent.prototype.unit = function () {
    return this.unit;
}

WeatherEvent.prototype.setUnit = function (_unit) {
    this.unit=_unit;
}

// data interval
class DateInterval {
    constructor(to, from) {
        this.to = to;
        this.from = from;
    }
}

DateInterval.prototype.to = function () {
    return this.to;
}

DateInterval.prototype.from = function () {
    return this.from;
}

DateInterval.prototype.contains = function (date) {
    return (date >= this.from && date <= this.to)
}

// weather data
class WeatherData extends WeatherEvent {
    constructor(number, date, place, type, unit) {
        super(date, place, type, unit)
        this.number = number
    }
}

WeatherData.prototype.value = function () {
    return this.number
}

WeatherData.prototype.setValue = function (_number) {
    this.number = _number
}

// temperature
class Temperature extends WeatherData {
    constructor(number, date, place, type, unit) {
        super(number, date, place, type, unit)
    }
}
Temperature.prototype.convertToF = function () {
    return this.number * 9 / 5 + 32;
}

Temperature.prototype.convertToC = function () {
    return (this.number - 32) * 5 / 9;
}

// wind
class Wind extends WeatherData {
    constructor(direction, number, date, place, type, unit) {
        super(number, date, place, type, unit)
        this.direction = direction;
    }
}

Wind.prototype.direction = function () {
    return this.direction
}

Wind.prototype.convertToMPH = function () {
    return ((this.number / 1000) / 1.6093) * 3600
}

Wind.prototype.convertToMS = function () {
    return (((this.number * 1.6093) * 1000) / 60) / 60
}

// precipitation
class Precipitation extends WeatherData {
    constructor(precipitationType, number, date, place, type, unit) {
        super(number, date, place, type, unit)
        this.precipitationType = precipitationType;
    }
}

Precipitation.prototype.convertToInches = function () {
    return this.number * 25.4
}

Precipitation.prototype.convertToMM = function () {
    return this.number / 25.4
}

// cloud covarage
class CloudCovarage extends WeatherData {
    constructor(date, place, type, unit, number) {
        super(date, place, type, unit, number)
    }
}

// weather history
class WeatherHistory {
    constructor() {
        this.weatherDataCollection = [];
        this.place;
        this.type;
        this.period;
    }
}

WeatherHistory.prototype.getCurrentPlace = function () {
    return this.place;
}
WeatherHistory.prototype.setCurrentPlace = function (newPlace) {
    this.place = newPlace;
}
WeatherHistory.prototype.clearCurrentPlace = function () {
    this.place = undefined;
}
WeatherHistory.prototype.getCurrentType = function () {
    return this.type;
}
WeatherHistory.prototype.setCurrentType = function (newWeatherDataType) {
    this.type = newWeatherDataType
}
WeatherHistory.prototype.clearCurrentType = function () {
    this.type = undefined;
}
WeatherHistory.prototype.getCurrentPeriod = function () {
    return this.period
}
WeatherHistory.prototype.setCurrentPeriod = function (newPeriod) {
    this.period = newPeriod;
}
WeatherHistory.prototype.clearCurrentPeriod = function () {
    this.period = undefined;
}
WeatherHistory.prototype.convertToIntUnits = function () {

    data = this.weatherDataCollection;

    for (i = 0; i < data.length; i++) {
        if (data[i].unit === "F") {
            newValue = (data[i].value() - 32) * 5 / 9;
            data[i].setValue(newValue);
            data[i].setUnit('C')

        } else if (data[i].unit === 'MPH') {
            newValue = (((data[i].value() * 1.6093) * 1000) / 60) / 60;
            data[i].setValue(newValue);
            data[i].setUnit('MS')

        } else if (data[i].unit === 'Inches') {
            newValue = data[i].value() / 25.4;
            data[i].setValue(newValue);
            data[i].setUnit('MM')
        } else {
            return undefined
        }
    }
}
WeatherHistory.prototype.convertToUSUnits = function() {

    data = this.weatherDataCollection;

    for (i = 0; i < data.length; i++) {
        if (data[i].unit === "C") {
            newValue = data[i].value() * 9 / 5 + 32;
            data[i].setValue(newValue);
            data[i].setUnit('F')
        } else if (data[i].unit === 'MS') {
            newValue = ((data[i].value() / 1000) / 1.6093) * 3600;
            data[i].setValue(newValue);
            data[i].setUnit('MPH')
        } else if (data[i].unit === 'MM') {
            this.newValue = data[i].value() * 25.4;
            data[i].setValue(newValue);
            data[i].setUnit('Inches')
        } else {
            return undefined
        }
    }
};

WeatherHistory.prototype.add = function (data) {
    this.weatherDataCollection.push(data);
    return this.weatherDataCollection;
}
WeatherHistory.prototype.data = function () {

    data = this.weatherDataCollection;

    for (let i = 0; i < data.length; i++) {

        console.log(`City: ${data[i].place}| Date: ${data[i].time()}| Type: ${data[i].type}| Value: ${data[i].value()}| Unit: ${data[i].unit}`)
    }
}

// weather prediction 
class WeatherPrediction extends WeatherEvent {
    constructor(date, to, from, place, type, unit) {
        super(date, place, type, unit)
        this.to = to;
        this.from = from;
    }
}

WeatherPrediction.prototype.to = function () {
    return this.to;
}

WeatherPrediction.prototype.from = function () {
    return this.from;
}

WeatherPrediction.prototype.setTo = function (_to) {
    this.to = _to
}

WeatherPrediction.prototype.setFrom = function (_from) {
    this.from = _from
}

WeatherPrediction.prototype.matches = function (data) {
    return (data.value() >= this.to && data.value() <= this.from &&
        data.type === this.type && data.place === this.place &&
        data.unit === this.unit);
}

// temperature prediction
class TemperaturePrediction extends WeatherPrediction {
    constructor(date, to, from, place, type, unit) {
        super(date, to, from, place, type, unit)
    }
}
TemperaturePrediction.prototype.convertToF = function () {
    to = this.to * 9 / 5 + 32;
    from = this.from * 9 / 5 + 32;
    return 'To: ' + to + ' From: ' + from;
}

TemperaturePrediction.prototype.convertToC = function () {
    this.to = (to - 32) * 5 / 9;
    this.from = (from - 32) * 5 / 9;
    return 'To: ' + to + ' From: ' + from;
}

// precipitation prediction
class PrecipitationPrediction extends WeatherPrediction {
    constructor(precipitationTypes, date, to, from, place, type, unit) {
        super(date, to, from, place, type, unit)
        this.precipitationTypes = precipitationTypes;
    }
}

PrecipitationPrediction.prototype.types = function () {
    return this.precipitationTypes;
}


PrecipitationPrediction.prototype.matches = function (data) {
    return (data.value() >= this.to && data.value() <= this.from &&
        data.type === this.type && data.place === this.place &&
        data.unit === this.unit);
}

PrecipitationPrediction.prototype.convertToInches = function () {
    to = this.to * 25.4;
    from = this.from * 25.4;
    return 'To: ' + to + ' From: ' + from;
}

Precipitation.prototype.convertToMM = function () {
    to = this.to / 25.4;
    from = this.from / 25.4;
    return 'To: ' + to + ' From: ' + from;
}

// wind prediction
class WindPrediction extends WeatherPrediction {
    constructor(directions, date, to, from, place, type, unit) {
        super(date,to, from, place, type, unit)
        this.directions = directions;
    }
}

WindPrediction.prototype.direction = function () {
    return this.directions
}

WindPrediction.prototype.matches = function (data) {
    return (data.value() >= this.to && data.value() <= this.from &&
        data.type === this.type && data.place === this.place &&
        data.unit === this.unit);
}

WindPrediction.prototype.convertToMPH = function () {
    to = ((this.to / 1000) / 1.6093) * 3600;
    from = ((this.to / 1000) / 1.6093) * 3600;
    return 'To: ' + to + ' From: ' + from;
}

WindPrediction.prototype.convertToMS = function () {
    to = (((this.to * 1.6093) * 1000) / 60) / 60;
    from = ((this.from / 1000) / 1.6093) * 3600;
    return 'To: ' + to + ' From: ' + from;
}

// cloud covarage prediction
class CloudCovaragePrediction extends WeatherPrediction {
    constructor(date ,to, from, place, type, unit) {
        super(date ,to, from, place, type, unit)
    }
}

CloudCovaragePrediction.prototype.matches = function (data) {
    return (data.value() >= this.to && data.value() <= this.from &&
        data.type === this.type && data.place === this.place &&
        data.unit === this.unit);
}

// weather forecast
class WeatherForecast {
    constructor() {
        this.weatherDataCollection = [];
        this.place;
        this.type;
        this.period;

    }

}
WeatherForecast.prototype.getCurrentPlace = function () {
    return this.place;
}
WeatherForecast.prototype.setCurrentPlace = function (newPlace) {
    this.place = newPlace;
}
WeatherForecast.prototype.clearCurrentPlace = function () {
    this.place = undefined;
}
WeatherForecast.prototype.getCurrentType = function () {
    return this.type;
}
WeatherForecast.prototype.setCurrentType = function (newWeatherDataType) {
    this.type = newWeatherDataType
}
WeatherForecast.prototype.clearCurrentType = function () {
    this.type = undefined;
}
WeatherForecast.prototype.getCurrentPeriod = function () {
    return this.period
}
WeatherForecast.prototype.setCurrentPeriod = function (newPeriod) {
    this.period = newPeriod;
}
WeatherForecast.prototype.clearCurrentPeriod = function () {
    this.period = undefined;
}
WeatherForecast.prototype.convertToUSUints = function () {

    data = this.weatherDataCollection;

    for (i = 0; i < data.length; i++) {
        if (data[i].unit === "C") {
            newTo = data[i].to() * 9 / 5 + 32;
            newFrom = data[i].from() * 9 / 5 + 32;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('F')
        } else if (data[i].unit === 'MS') {
            newTo = ((data[i].to() / 1000) / 1.6093) * 3600;
            newFrom = ((data[i].from() / 1000) / 1.6093) * 3600;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('MPH')
        } else if (data[i].unit === 'MM') {
            newTo = data[i].to() * 25.4;
            newFrom = data[i].from() * 25.4;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('Inches')
        } else {
            return 'Undefined unit'
        }
    }
}
WeatherForecast.prototype.convertToUSUnits = function () {

    data = this.weatherDataCollection;
    
    for (i = 0; i < data.length; i++) {
        if (data[i].unit === "F") {
            newTo = (data[i].to() - 32) * 5 / 9;
            newFrom = (data[i].from() - 32) * 5 / 9;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('C')

        } else if (data[i].unit === 'MPH') {
            newTo = (((data[i].to() * 1.6093) * 1000) / 60) / 60;
            newFrom = (((data[i].from() * 1.6093) * 1000) / 60) / 60;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('MS')
        } else if (data[i].unit === 'Inches') {
            newTo = data[i].to() / 25.4;
            newFrom = data[i].from() / 25.4;
            data[i].setTo(newTo);
            data[i].setFrom(newFrom);
            data[i].setUnit('MM')
        } else {
            return 'Undefined unit'
        }
    }
};

WeatherForecast.prototype.add = function (data) {
    this.weatherDataCollection.push(data);
}

WeatherForecast.prototype.data = function () {
    data = this.weatherDataCollection;
    for (let i = 0; i < data.length; i++) {   
    console.log(`City: ${data[i].place}| Date; ${data[i].time()}| Type: ${data[i].type}| To: ${data[i].to}| From: ${data[i].from}| Unit: ${data[i].unit}`)
    }
}



//dateInterval test

console.log('----dateInterval test----')
let date = new Date(2020, 04, 20)
let dateFrom = new Date(2019, 04, 16);
let dateTo = new Date();
const dint = new DateInterval(dateFrom, dateTo)
console.log(dint.contains(date))

// temperature test
console.log('----temperature test----')
const temp = new Temperature(10, date, 'Århus', 'Sunny', 'C')
console.log(temp.convertToF(), temp.value())

const tempData = new WeatherData(23, date, 'Århus', 'Sunny', 'C')

const tempPred = new TemperaturePrediction(4, 10, 'Århus', 'Sunny', 'C');
console.log(tempPred.matches(tempData))
console.log(tempPred.convertToF(), tempPred.to, tempPred.from)

// precipitation test
console.log('----precipitation test----')
const pre = new Precipitation('High',100, date, 'Århus', 'Rain', 'MM')
console.log(pre.convertToInches(), pre.value())

const preData = new WeatherData(60, date, 'Horsens', 'Rain', 'MM')

const prePred = new PrecipitationPrediction('High', 90, 120,'Århus', 'Rain', 'MM')
console.log(prePred.matches(preData))
console.log(prePred.convertToInches(), prePred.to, prePred.from)

// // wind test
console.log('----wind test----')
const wind = new Wind('east', 26, date, 'Århus', 'Rain', 'MS')
console.log(wind.convertToMPH(), wind.value())

const windData = new WeatherData(27, date, 'Horsens', 'Windy', 'MS')

const windPred = new WindPrediction('east',26, 29, 'Århus', 'Rain', 'MS')
console.log(windPred.matches(windData))
console.log(windPred.convertToMPH(), windPred.to, windPred.from)

// cloud covarage test
console.log('----cloud covarage test----')
const cloud = new CloudCovarage(0.68 , date , 'Århus', 'Sunny', 'Clouds');
console.log(cloud.value())

const CloudData = new WeatherData(10, date, 'Viborg', 'Cloudy', 'Clouds')

const cloudPred = new CloudCovaragePrediction(0.68 , 0.72, 'Århus', 'Sunny', 'Clouds');
console.log(cloudPred.to, cloudPred.from, cloudPred.matches(CloudData))


// weather history test
console.log('----weather history test----')
const data1 = new WeatherData(23, date, 'Århus', 'Sunny', 'C')
const data2 = new WeatherData(60, date, 'Horsens', 'Rain', 'C')
const data3 = new WeatherData(10, date, 'Viborg', 'Cloudy', 'MM')

const his = new WeatherHistory()

his.add(data1)
his.add(data2)
his.add(data3)
his.convertToUSUnits()
his.data()


// weather forcast test
console.log('----weather forcast test----')
const forecast1 = new WeatherPrediction(date, 29, 33, 'Århus', 'Sunny', 'C')
const forecast2 = new WeatherPrediction(date, 10, 15, 'Horsens', 'Rain', 'C')
const forecast3 = new WeatherPrediction(date, 12, 17, 'Viborg', 'Cloudy', 'MM')

const forecast = new WeatherForecast()
forecast.add(forecast1)
forecast.add(forecast2)
forecast.add(forecast3)
forecast.convertToUSUnits()
forecast.data()