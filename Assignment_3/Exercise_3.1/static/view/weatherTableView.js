export default (window, dispatcher) => {
    const document = window.document
    const table_body = document.getElementById('weatherData')
    const listeners = []
    const listen = l => listeners.push(l)

    document.getElementById("reload").addEventListener("click", function(){
        const event = { event_type: 'reload' }
        const theDispatcher = dispatcher()
        theDispatcher(event)
      });

    document.getElementById("refresh").addEventListener("click", function(){
        const event = { event_type: 'refresh' }
        const theDispatcher = dispatcher()
        theDispatcher(event)
    });
    
    document.getElementById("weatherDataUpdate").addEventListener("click", function(){
        const event = { 
            event_type: 'update', 
            city: document.getElementById('weatherDataCity').value,
            dateFrom: document.getElementById('weatherDataDateFrom').value,
            dateTo: document.getElementById('weatherDataDateTo').value 
        }
        const theDispatcher = dispatcher()
        theDispatcher(event)
    });

    document.getElementById("insertData").addEventListener("click", function(){
        const event = { 
            event_type: 'insert', 
            place: document.getElementById('newCity').value,
            type: document.getElementById('newType').value,
            unit: document.getElementById('newUnit').value,
            time: document.getElementById('newTime').value,
            value: document.getElementById('newValue').value,
        }
        switch (event.newType) {
            case "wind speed": event.direction = document.getElementById('newInfo').value; break;
            case "precipitation": body.precipitation_type =  document.getElementById('newInfo').value; break;
            default: {}
        }

        const theDispatcher = dispatcher()
        theDispatcher(event)
    });
    
    const addWeather = w => {
        const tr = document.createElement('tr')
        tr.insertCell().appendChild(document.createTextNode(w.place))
        tr.insertCell().appendChild(document.createTextNode(w.time))
        tr.insertCell().appendChild(document.createTextNode(w.type))
        tr.insertCell().appendChild(document.createTextNode(w.unit))
        tr.insertCell().appendChild(document.createTextNode(w.value))

        if(w.precipitation_type){
            tr.insertCell().appendChild(document.createTextNode(w.precipitation_type))
            }
        else if(w.direction){
                tr.insertCell().appendChild(document.createTextNode(w.direction))
            }
            return tr
        }

    const getReport = model => {
        const response = {
            avgCloudCoverage: model.getAvgCloudCoverage(),
            precipitation: model.getPrecipitation(),
            windSpeed: model.getAvgWindSpeed(),
            windDirection: model.getWindDirection(),
            minTemperature: model.getMinTemperature(),
            maxTemperature: model.getMaxTemperature()
        }
        return response
    }

    const view = model => {
        const response = {
            rows: model.currentData().map(addWeather),
            report: getReport(model)
        }
        return response
    }

    const renderer = data => {
        let rows = data.rows
        let report = data.report
        
        while(table_body.firstChild) 
            table_body.removeChild(table_body.firstChild)
        
        rows.forEach(r => table_body.appendChild(r))

        document.getElementById('cloudCoverage').textContent = report.avgCloudCoverage
        document.getElementById('precipitation').textContent = report.precipitation
        document.getElementById('windSpeed').textContent = report.windSpeed
        document.getElementById('windDirection').textContent =report.windDirection
        document.getElementById('minTemperature').textContent = report.minTemperature
        document.getElementById('maxTemperature').textContent = report.maxTemperature
    }
    const prompt = window.prompt.bind(window)

    return { view, renderer }
}