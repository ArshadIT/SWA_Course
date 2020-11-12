    window.init = function() {
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:8080/data')
        request.send()
        request.onload = () => {
                    const document = window.document
                    const table_body = document.getElementById('weather_data')
                    const weatherData = JSON.parse(request.responseText)

                    //calculting latest date and filtering our data
                    const latestDate1 = new Date(Math.max.apply(null, weatherData.map(e => { return new Date(e.time) })));
                    const latestData1 = weatherData.filter(e => { const d = new Date(e.time); return d.getTime() == latestDate1.getTime() })
                    
                    latestData1.map(d => {
                      const tr = table_body.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })

                    // finding minimum temp for last 5 days
                    const today = new Date();
                    const fiveDays = new Date(today.setDate(today.getDate() - 5));

                    const fiveDaysDate = weatherData.filter(e => { const d = new Date(e.time); return d.getDate() > fiveDays.getDate() })
                    
                    // filter by city
                    const temp = fiveDaysDate.filter(t => t.type === 'temperature')

                    const tempHorsens = temp.filter(t => t.place === 'Horsens')
                    const tempÅrhus = temp.filter(t => t.place === 'Aarhus')
                    const tempCph = temp.filter(t => t.place === 'Copenhagen')

                    let dateMinHorsens = Math.min(...tempHorsens.map(item => item.value))
                    let dateMinÅrhus = Math.min(...tempÅrhus.map(item => item.value))
                    let dateMinCph = Math.min(...tempCph.map(item => item.value))

                    let dateMaxHorsens = Math.max(...tempHorsens.map(item => item.value))
                    let dateMaxÅrhus = Math.max(...tempÅrhus.map(item => item.value))
                    let dateMaxCph = Math.max(...tempCph.map(item => item.value))

                    const tempMinHorsens = tempHorsens.filter(item => item.value === dateMinHorsens)
                    const tempMinÅrhus = tempÅrhus.filter(item => item.value === dateMinÅrhus)
                    const tempMinCph = tempCph.filter(item => item.value === dateMinCph)

                    const tempMaxHorsens = tempHorsens.filter(item => item.value === dateMaxHorsens)
                    const tempMaxÅrhus = tempÅrhus.filter(item => item.value === dateMaxÅrhus)
                    const tempMaxCph = tempCph.filter(item => item.value === dateMaxCph)

                    tempMinHorsens.map(d => {
                      const tr = table_min.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })
                    tempMinÅrhus.map(d => {
                      const tr = table_min.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })
                    tempMinCph.map(d => {
                      const tr = table_min.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })

                    tempMaxHorsens.map(d => {
                      const tr = table_max.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })
                    tempMaxÅrhus.map(d => {
                      const tr = table_max.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })
                    tempMaxCph.map(d => {
                      const tr = table_max.appendChild(document.createElement('tr'))
                      tr.insertCell().appendChild(document.createTextNode(d.place))
                      tr.insertCell().appendChild(document.createTextNode(d.value))
                      tr.insertCell().appendChild(document.createTextNode(d.type))
                      tr.insertCell().appendChild(document.createTextNode(d.unit))
                      tr.insertCell().appendChild(document.createTextNode(d.time)) 
                    })

                    //total precipitation
                    const prec = fiveDaysDate.filter(t => t.type === 'precipitation')

                    const precHorsens = prec.filter(t => t.place === 'Horsens')
                    const precÅrhus = prec.filter(t => t.place === 'Aarhus')
                    const precCph = prec.filter(t => t.place === 'Copenhagen')
                    var sumHorsens = 0;
                    var sumÅrhus = 0;
                    var sumCph = 0;

                    precHorsens.map(d => {
                      sumHorsens+= parseFloat(d.value)
                    })

                    const trH = table_prec.appendChild(document.createElement('tr'))
                    trH.insertCell().appendChild(document.createTextNode('Horsens'))
                    trH.insertCell().appendChild(document.createTextNode(sumHorsens))

                    precÅrhus.map(d => {
                      sumÅrhus+= parseFloat(d.value)
                    })

                    const trÅ = table_prec.appendChild(document.createElement('tr'))
                    trÅ.insertCell().appendChild(document.createTextNode('Aarhus'))
                    trÅ.insertCell().appendChild(document.createTextNode(sumÅrhus))

                    precCph.map(d => {
                      sumCph+= parseFloat(d.value)
                    })

                    const trC = table_prec.appendChild(document.createElement('tr'))
                    trC.insertCell().appendChild(document.createTextNode('Copenhagen'))
                    trC.insertCell().appendChild(document.createTextNode(sumCph))

                    //Average wind speed
                    const wind = fiveDaysDate.filter(t => t.type === 'wind speed')

                    const windHorsens = wind.filter(t => t.place === 'Horsens')
                    const windÅrhus = wind.filter(t => t.place === 'Aarhus')
                    const windCph = wind.filter(t => t.place === 'Copenhagen')

                    var sumHorsensWind = 0;
                    var sumÅrhusWind = 0;
                    var sumCphWind = 0;

                    windHorsens.map(d => {
                      sumHorsensWind+= parseFloat(d.value)
                    })

                    const trHW = table_wind.appendChild(document.createElement('tr'))
                    trHW.insertCell().appendChild(document.createTextNode('Horsens'))
                    trHW.insertCell().appendChild(document.createTextNode(sumHorsensWind/windHorsens.length))

                    windÅrhus.map(d => {
                      sumÅrhusWind+= parseFloat(d.value)
                    })

                    const trÅW = table_wind.appendChild(document.createElement('tr'))
                    trÅW.insertCell().appendChild(document.createTextNode('Aarhus'))
                    trÅW.insertCell().appendChild(document.createTextNode(sumÅrhusWind/windÅrhus.length))

                    windCph.map(d => {
                      sumCphWind+= parseFloat(d.value)
                    })

                    const trCW = table_wind.appendChild(document.createElement('tr'))
                    trCW.insertCell().appendChild(document.createTextNode('Copenhagen'))
                    trCW.insertCell().appendChild(document.createTextNode(sumCphWind/windCph.length))
                    

                    // Dominant wind direction

                    function mode(arr){
                      return arr.sort((a,b) =>
                            arr.filter(v => v===a).length
                          - arr.filter(v => v===b).length
                      ).pop();
                    }

                    const horsensDir = [];
                    const ÅrhusDir = [];
                    const CphDir = [];

                    windHorsens.map(d => {
                      horsensDir.push(d.direction)
                    })

                    const trHD = table_windDir.appendChild(document.createElement('tr'))
                    trHD.insertCell().appendChild(document.createTextNode('Horsens'))
                    trHD.insertCell().appendChild(document.createTextNode(mode(horsensDir)))

                    windÅrhus.map(d => {
                      ÅrhusDir.push(d.direction)
                    })

                    const trÅD = table_windDir.appendChild(document.createElement('tr'))
                    trÅD.insertCell().appendChild(document.createTextNode('Aarhus'))
                    trÅD.insertCell().appendChild(document.createTextNode(mode(ÅrhusDir)))

                    windCph.map(d => {
                      CphDir.push(d.direction)
                    })

                    const trCD = table_windDir.appendChild(document.createElement('tr'))
                    trCD.insertCell().appendChild(document.createTextNode('Copenhagen'))
                    trCD.insertCell().appendChild(document.createTextNode(mode(CphDir)))

                    //Average cloud covarage
                    const cloud = fiveDaysDate.filter(t => t.type === 'cloud coverage')

                    const cloudHorsens = cloud.filter(t => t.place === 'Horsens')
                    const cloudÅrhus = cloud.filter(t => t.place === 'Aarhus')
                    const cloudCph = cloud.filter(t => t.place === 'Copenhagen')

                    var sumHorsenscloud = 0;
                    var sumÅrhuscloud = 0;
                    var sumCphcloud = 0;

                    cloudHorsens.map(d => {
                      sumHorsenscloud+= parseFloat(d.value)
                    })

                    const trHC = table_cloud.appendChild(document.createElement('tr'))
                    trHC.insertCell().appendChild(document.createTextNode('Horsens'))
                    trHC.insertCell().appendChild(document.createTextNode(sumHorsenscloud/cloudHorsens.length))

                    cloudÅrhus.map(d => {
                      sumÅrhuscloud+= parseFloat(d.value)
                    })

                    const trÅC = table_cloud.appendChild(document.createElement('tr'))
                    trÅC.insertCell().appendChild(document.createTextNode('Aarhus'))
                    trÅC.insertCell().appendChild(document.createTextNode(sumÅrhuscloud/cloudÅrhus.length))

                    cloudCph.map(d => {
                      sumCphcloud+= parseFloat(d.value)
                    })

                    const trCC = table_cloud.appendChild(document.createElement('tr'))
                    trCC.insertCell().appendChild(document.createTextNode('Copenhagen'))
                    trCC.insertCell().appendChild(document.createTextNode(sumCphcloud/cloudCph.length)) 
                    

                    // Hourly predictions for the next 24 hours.

                    request.open('GET', 'http://localhost:8080/forecast')
                    request.send()
                    request.onload = () => {
                                const document = window.document
                                const table_body = document.getElementById('forecast_data')
                                const weatherData = JSON.parse(request.responseText)
                                weatherData.map(d => {
                                  const tr = table_body.appendChild(document.createElement('tr'))
                                  tr.insertCell().appendChild(document.createTextNode(d.place))
                                  tr.insertCell().appendChild(document.createTextNode(d.from))
                                  tr.insertCell().appendChild(document.createTextNode(d.to))
                                  tr.insertCell().appendChild(document.createTextNode(d.type))
                                  tr.insertCell().appendChild(document.createTextNode(d.unit))
                                  tr.insertCell().appendChild(document.createTextNode(d.time)) 
                                })   
                                }   
                    
        }
   }