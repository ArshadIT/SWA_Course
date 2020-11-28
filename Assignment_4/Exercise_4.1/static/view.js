const view = (window, currentSeverity) => {

    const document = window.document
    const table_body = document.getElementById('warnings')
    document.getElementById('currentSeverity').textContent = currentSeverity

    const updateSeverity = severity => {
        document.getElementById('severity').value = ""
        document.getElementById('currentSeverity').textContent = severity
    }

    const addWarning = w => {
        const tr = document.createElement('tr')        
        let prediction = w.prediction

        tr.insertCell().appendChild(document.createTextNode("NEW"))
        tr.insertCell().appendChild(document.createTextNode(w.id))
        tr.insertCell().appendChild(document.createTextNode(w.severity))
        tr.insertCell().appendChild(document.createTextNode(prediction.place))
        tr.insertCell().appendChild(document.createTextNode(prediction.time))
        tr.insertCell().appendChild(document.createTextNode(prediction.type))
        tr.insertCell().appendChild(document.createTextNode(prediction.unit))
        tr.insertCell().appendChild(document.createTextNode(prediction.from))
        tr.insertCell().appendChild(document.createTextNode(prediction.to))

        if (prediction.precipitation_types) {
            tr.insertCell().appendChild(document.createTextNode(prediction.precipitation_types))
        } else if (prediction.directions) {
            tr.insertCell().appendChild(document.createTextNode(prediction.directions))
        }
        table_body.append(tr)
    }

    const updateWarning = (newWarning, oldWarning) => {
        const tr = document.createElement('tr')
        let newPrediction = newWarning.prediction
        let oldPrediction = oldWarning.prediction

        let severity = newWarning.severity
        let place = newPrediction.place
        let time = newPrediction.time
        let type = newPrediction.type
        let unit = newPrediction.unit
        let from = newPrediction.from
        let to = newPrediction.to

        if (parseInt(oldWarning.severity) != parseInt(newWarning.severity)) severity += ("<br><strike>" + oldWarning.severity + "</strike>")
        if (oldPrediction.place != newPrediction.place) place += "<br><strike>" + oldPrediction.place + "</strike>"
        if (oldPrediction.time != newPrediction.time) time += "<br><strike>" + oldPrediction.time + "</strike>"
        if (oldPrediction.type != newPrediction.type) type += "<br><strike>" + oldPrediction.type + "</strike>"
        if (oldPrediction.unit != newPrediction.unit) unit += "<br><strike>" + oldPrediction.unit + "</strike>"
        if (parseFloat(oldPrediction.from) != parseFloat(newPrediction.from)) from += (",<br><strike>" + oldPrediction.from + "</strike>")
        if (parseFloat(oldPrediction.to) != parseFloat(newPrediction.to)) to += ("<br><strike>" + oldPrediction.to + "</strike>")

        tr.innerHTML += "<td>CHANGED</td>"
        tr.innerHTML += "<td>" + oldWarning.id + "</td>"
        tr.innerHTML += "<td>" + severity + "</td>"
        tr.innerHTML += "<td>" + place + "</td>"
        tr.innerHTML += "<td>" + time + "</td>"
        tr.innerHTML += "<td>" + type + "</td>"
        tr.innerHTML += "<td>" + unit + "</td>"
        tr.innerHTML += "<td>" + from + "</td>"
        tr.innerHTML += "<td>" + to + "</td>"

        if (oldPrediction.precipitation_types) {
            let notIncluded = []
            let html = "<td>" + newPrediction.precipitation_types
            oldPrediction.precipitation_types.map(p => {
                if (oldPrediction.precipitation_types.indexOf(p) == -1)
                    notIncluded.push(p)
            })
            html += "<strike>" + notIncluded + "</strike>"
            html += "</td>"
            tr.innerHTML += html
        } else if (oldPrediction.directions) {
            let notIncluded = []
            let html = "<td>" + newPrediction.directions + ","
            oldPrediction.directions.map(p => {
                if (newPrediction.directions.indexOf(p) == -1)
                    notIncluded.push(p)
            })
            html += "<strike>" + notIncluded + "</strike> "
            html += "</td>"
            tr.innerHTML += html
        }

        table_body.append(tr)
        return newWarning
    }

    const getPauseButton = () => document.getElementById('pause')
    const getResumeButton = () => document.getElementById('resume')
    const getUpdateButton = () => document.getElementById('update')
    let getSubscribeButton = () => document.getElementById('subscribe')
    const getSeverity = () => document.getElementById('severity').value

    return {
        addWarning,
        updateWarning,
        updateSeverity,
        getPauseButton,
        getResumeButton,
        getUpdateButton,
        getSubscribeButton,
        getSeverity
    }
}

export default view