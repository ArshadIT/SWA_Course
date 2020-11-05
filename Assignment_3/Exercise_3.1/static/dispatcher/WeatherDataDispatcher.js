export default store => async ({event_type, ...p}) =>  {
    switch(event_type) {
        case 'reload':
            const weatherData= await fetch('http://localhost:8080/data').then(res => res.json())
            store({event_type, ...p, weatherData})
          break;
        case 'refresh':
            store({event_type, ...p})
          break;
        case 'update':
            store({event_type, ...p})
            break;
        case 'insert':
            let body = p
            console.log(body)
            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
            const newWeatherData = await fetch('http://localhost:8080/data',
            { 
              method: 'POST', 
              body: JSON.stringify(body), 
              headers
            }).then(res => res.json())
            store({event_type, ...p, newWeatherData})
            break;
        default:
      }
}