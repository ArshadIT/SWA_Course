function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
    }
    window.init = function() {
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:8080/data')
        request.send()
        request.onload = () => {
                    const document = window.document
                    const table_body = document.getElementById('weather_data')
                    const weatherData = JSON.parse(request.responseText)
                    const acc = [];
                    let today = new Date();
                    let secondDate = new Date(today.setDate( today.getDate() - 5 ));
                    let yesterday = new Date(today.setDate( today.getDate() - 1 ));
                    let sum = 0;
                    let avrWind = 0;
                    let avrCloud = 0;
                    const windDirection = [];
                    for(let i = 0; i < weatherData.length; i++){
                      if(weatherData[i].place=='Horsens' && Date.parse(weatherData[i].time) >= secondDate && weatherData[i].type==="temperature"){
                        
                      const tr = table_body.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].place))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].value))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].type))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].unit))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].time)) 
                      }
                      if(Date.parse(weatherData[i].time) >= secondDate && weatherData[i].type==="temperature"){
                        acc.push(weatherData[i].value)

                      } else if (Date.parse(weatherData[i].time) >= secondDate && weatherData[i].type==="precipitation") {
                        sum += parseFloat(weatherData[i].value)
                      } else if (Date.parse(weatherData[i].time) >= secondDate && weatherData[i].type==="wind speed") {
                        avrWind += parseFloat(weatherData[i].value)
                        windDirection.push(weatherData[i].direction)
                      } else if (Date.parse(weatherData[i].time) >= secondDate && weatherData[i].type==="cloud coverage") {
                        avrCloud += parseFloat(weatherData[i].value)
                      }
                    }   
                    console.log(Math.min(...acc));
                    console.log(Math.max(...acc));
                    console.log(sum);
                    console.log(avrWind/weatherData.length)
                    console.log(mode(windDirection))
                    console.log(avrCloud/weatherData.length)
        request.open('GET', 'http://localhost:8080/forecast')
        request.send()
        request.onload = () => {
                    const document = window.document
                    const table_body = document.getElementById('forecast_data')
                    const weatherData = JSON.parse(request.responseText)
                    for(let i = 0; i < weatherData.length; i++){
                      if(weatherData[i].place=='Horsens') {
                      const tr = table_body.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].place))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].from))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].to))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].type))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].unit))
                      tr.insertCell().appendChild(document.createTextNode(weatherData[i].time)) 
                      }
                      
                    }   
                    
        }
        }
       
   }