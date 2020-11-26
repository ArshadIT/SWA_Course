import model from './model.js'
import view from './view.js'

window.onload = () => {

    let subscribed = true
    let min_severity = 0

    let min_view = view(window, min_severity)
    let min_model = model()

    min_view.getUpdateButton().onclick = () => {
        min_severity = parseInt(min_view.getSeverity())
        min_view.updateSeverity(min_severity)
    }

    min_view.getSubscribeButton().onclick = () => {
        if (subscribed) {
            subscribed = false;
            min_view.getSubscribeButton().textContent = 'Subscribe'
            unsubscribe()
        } else {
            subscribed = true;
            min_view.getSubscribeButton().textContent = 'Unsubscribe'
            subscribe()
        }

    }

    const subscribe = () => {
        sock.send('subscribe')
        getData(sock)
    }

    const unsubscribe = () => {
        sock.send('unsubscribe')
    }

    function getData(sock) {
        sock.onmessage = function (event) {
            let data = JSON.parse(event.data)
            if (data['warnings'] !== undefined) {
                getArrData(data['warnings'])
            } else if ((data.prediction != null || data.prediction != undefined) && data.severity > min_severity) {
                if (min_model.exists(data)) {
                    if (min_model.isChanged(data)) {
                        min_view.updateWarning(data, min_model.getWarning(data.id))
                        min_model.updateWarning(data)
                    }
                } else {
                    min_view.addWarning(data)
                    min_model.addWarning(data)
                }
            }

        }
    }

    function getArrData(warnings) {
        //To be changed
        warnings
            .filter(warning => warning.prediction != null || warning.prediction != undefined)
            .filter(warning => warning.severity > min_severity)
            .map(warning => min_model.addWarning(warning))
            .map(warning => min_view.addWarning(warning))
    }

    // On load
    let sock = new WebSocket('ws://localhost:8090/warnings')
    sock.onopen = () => subscribe()

}