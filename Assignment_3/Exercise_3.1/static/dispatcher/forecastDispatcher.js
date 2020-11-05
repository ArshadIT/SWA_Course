export default store => async({type, ...params}) =>{
    switch(type) {
        case 'reload':
            const forcastcastWeatherData = await fetech('http://localhost:8080/forcast')
            .then(r =>r.json())
        store({type, ...params, forcastcastWeatherData})
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