export default (window, dispatcher) => {
    const document = window.document
    const table_body = document.getElementById('weatherDataForecast')
    const listeners = []

    const listen = l => listeners.push(l)
    
    document.getElementById("reload").addEventListener("click", function(){
        const event = { type: 'reload' }
        const theDispatcher = dispatcher()
        console.log("listener")
        theDispatcher(event)
      });

    document.getElementById("refresh").addEventListener("click", function(){
        const event = { type: 'refresh' }
        const theDispatcher = dispatcher()
        theDispatcher(event)
    });

    document.getElementById("forecastUpdate").addEventListener("click", function(){
        const event = { 
            type: 'update', 
            city: document.getElementById('forecastCity').value,
            dateFrom: document.getElementById('forecastDateFrom').value,
            dateTo: document.getElementById('forecastDateTo').value 
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
        tr.insertCell().appendChild(document.createTextNode(w.from))
        tr.insertCell().appendChild(document.createTextNode(w.to))

        if(w.precipitation_types){
            tr.insertCell().appendChild(document.createTextNode(w.precipitation_types))
            }
        else if(w.directions){
                tr.insertCell().appendChild(document.createTextNode(w.directions))
            }
            return tr
        }

    const view = model => model.currentData().map(addWeather)

    const renderer = rows => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        rows.forEach(r => table_body.appendChild(r))
    }
    const prompt = window.prompt.bind(window)

    return { view, renderer }
}