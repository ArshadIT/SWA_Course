export default (init_model, view, renderer) => {
    let model = init_model
    
    function reducer(action, model) {
        switch(action.type) {
          case 'reload':
            const {forecastWeatherData} = action
            return model.setNewData(forecastWeatherData)
        case 'refresh':
            return model.refresh()
        case 'update':
            const {city, dateFrom, dateTo} = action
            return model.setCurrentData(city, dateFrom, dateTo)
          default:
            return model
        }
      }
    
    return action => {
      model = reducer(action, model)
      renderer(view(model))
    }
}