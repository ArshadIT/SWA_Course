import forecastStore from "../store/forecastStore.js";

export default store => async ({type, ...params}) =>  {
    switch(type) {
        case 'reload':
            const forecastWeatherData= await fetch('http://localhost:8080/forecast').then(res => res.json())
            store({type, ...params, forecastWeatherData})
          break;
        case 'refresh':
            store({type, ...params})
          break;
        case 'update':
            store({type, ...params})
            break;
        default:
      }
}