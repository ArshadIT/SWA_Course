import model from './model.js'
import view from './view.js'
import{ajax}from"http://dev.jspm.io/rxjs@6.5.3/_esm2015/ajax/index.js"
import { fromEvent, from, of} from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { map,concatMap, delay, tap, mergeMap, repeat} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

window.onload = (event) => {
    let url = 'http://localhost:8080/warnings'
    let subscribed = true
    let min_severity = 0

    let min_view = view(window, min_severity)
    let min_model = model()

    getData();
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
        getData();
    }

    const unsubscribe = () => {
        
    }

    function getData() {
            const display = (data) => {
                    data.map((data) => {
                        if (min_model.exists(data)) {
                            if (min_model.isChanged(data)) {
                                min_view.updateWarning(data, min_model.getWarning(data.id))
                                min_model.updateWarning(data)
                            }
                        } else {
                            min_view.addWarning(data)
                            min_model.addWarning(data)
                        }
                      })
            };

            const poll = of({}).pipe(
                concatMap(() => from(fetch(url).then(r => r.json()))), //make api call
                map(response => response.warnings),                                 // get warnings from array
                map(response => response.filter(r => r.severity > min_severity)),   // filter severity
                tap(display),
                delay(3000),
                repeat(),
            );

            poll.subscribe();
    }    

}