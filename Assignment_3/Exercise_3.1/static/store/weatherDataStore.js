export default (init_model, view, renderer) => {
    let model = init_model
    
    function reducer(action, model) {
        switch(action.event_type) {
          case 'reload':
            const {weatherData} = action
            return model.setNewData(weatherData)
        case 'refresh':
            return model.refresh()
          case 'update':
            const {city, dateFrom, dateTo} = action
            return model.setCurrentData(city, dateFrom, dateTo)
          case 'insert':
            const {newWeatherData} = action
            return model.addWeather(newWeatherData)
          default:
            return model
        }
      }    
    return action => {
      model = reducer(action, model)
      renderer(view(model))
    }
}