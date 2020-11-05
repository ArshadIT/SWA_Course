const model = (weatherRecords, currentDataRecords) => {
    const currentData = () => currentDataRecords
    const refresh = () => model(weatherRecords, weatherRecords)

    const setNewData = newData => model(newData, newData)
    const setCurrentData = (city, dateFrom, dateTo) => model(weatherRecords, getData("all", city, dateFrom, dateTo))    
    const addWeather = weather => model(weatherRecords.concat(weather), currentDataRecords.concat(weather))

    const getAvgCloudCoverage = () => {
        let average = arr => (arr.reduce((a,b) => a + b, 0)/arr.length).toFixed(3)
        let data = getCurrentDataType("cloud coverage")
        return average (data.map((el) => el.value))
    }

    const getAvgWindSpeed = () => {
        let average = arr => (arr.reduce((a,b) => a + b, 0)/arr.length).toFixed(3)
        let data = getCurrentDataType("wind speed")
        return average (data.map((el) => el.value))
    }

    const getPrecipitation = () => (getCurrentDataType("precipitation")
        .map((el) => parseFloat(el.value))
        .reduce((a,b) => a + b, 0))
        .toFixed(3) 
    
    const getWindDirection = () => {
        let data = getCurrentDataType("wind speed").reduce((prev, curr) => (prev[curr.direction] = ++prev[curr.direction] || 1, prev), {});
        return Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b)
    }

    const getMinTemperature = () =>Math.min.apply(null, getCurrentDataType("temperature").map(el => parseInt(el.value)))
    const getMaxTemperature = () =>Math.max.apply(null, getCurrentDataType("temperature").map(el => parseInt(el.value)))
        
    const getData = (type, city, dateFrom, dateTo) => 
    weatherRecords.filter(el => 
           (el.type === type || type === "all")
        && (el.place === city || city === "all" || !city)
        && ((new Date(el.time) >= new Date(dateFrom) || !dateFrom) && (new Date(el.time) <= new Date(dateTo) || !dateTo)))
    
    const getCurrentDataType = (type) => currentDataRecords.filter(el => (el.type === type || type === "all"))

    return {
        setNewData,
        addWeather,
        refresh,
        currentData,
        getAvgCloudCoverage, 
        getPrecipitation, 
        getAvgWindSpeed,
        getWindDirection,
        getMinTemperature,
        getMaxTemperature,
        setCurrentData
    }
}

export default model