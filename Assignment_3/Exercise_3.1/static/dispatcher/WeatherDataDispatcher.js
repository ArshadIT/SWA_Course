 import weatherDataStore from "../store/weatherDataStore.js";

export default store => async ({event_type, ...params}) =>  {
  switch(event_type) {
      case 'reload':
          const weatherData= await fetch('http://localhost:8080/data').then(res => res.json())
          store({event_type, ...params, weatherData})
        break;
      case 'refresh':
          store({event_type, ...params})
        break;
      case 'update':
          store({event_type, ...params})
          break;
      case 'insert':
          let body = params
          console.log(body)
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          const newWeatherData = await fetch('http://localhost:8080/data',
          { 
            method: 'POST', 
            body: JSON.stringify(body), 
            headers
          }).then(res => res.json())
          store({event_type, ...params, newWeatherData})
          break;
      default:
    }
}