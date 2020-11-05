import model from './model.js'
import weatherTableview from './view/weatherTableView.js'
import forecastTableView from './view/forecastTableView.js'
import forecastStore from './store/forecastStore.js'
import weatherDataStore from './store/weatherDataStore.js'
import forecastDispatcher from './dispatcher/forecastDispatcher.js'
import weatherDataDispatcher from './dispatcher/weatherDataDispatcher.js'


window.init = async function init() {
    try {
        const weatherData= await fetch('http://localhost:8080/data').then(res => res.json())
        const forecastWeatherData= await fetch('http://localhost:8080/forecast').then(res => res.json())

        const weatherDataModel = model(weatherData, weatherData)
        const forecastModel = model(forecastWeatherData, forecastWeatherData)

        let theWeatherDataDispatcher
        let theForecastDispatcher

        const { view: weatherDataView, renderer: weatherDataRenderer } = weatherTableview(window, () => theWeatherDataDispatcher)
        const { view: forecastView, renderer: forecastRenderer } = forecastTableView(window, () => theForecastDispatcher)
        
        const theWeatherDataStore = weatherDataStore(weatherDataModel, weatherDataView, weatherDataRenderer)
        const theForecastStore = forecastStore(forecastModel, forecastView, forecastRenderer)

        theWeatherDataDispatcher = weatherDataDispatcher(theWeatherDataStore)
        theForecastDispatcher = forecastDispatcher(theForecastStore)

        weatherDataRenderer(weatherDataView(weatherDataModel))
        forecastRenderer(forecastView(forecastModel))
    } catch (e) {
        console.log(e)
    }
}