import model from './model.js'
import view from './view.js'
import {fromEvent, from, of} from 'https://dev.jspm.io/rxjs@6/_esm2015';
import {filter, flatMap, startWith, takeUntil ,map,concatMap, delay, tap, mergeMap, repeat} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

window.onload = () => {
    let url = 'http://localhost:8080/warnings'
    let min_severity = 0

    let min_view = view(window, min_severity)
    let min_model = model()

    var toggle = document.getElementById('toggle');

    // set min severity
    min_view.getUpdateButton().onclick = () => {
    min_severity = parseInt(min_view.getSeverity())
    min_view.updateSeverity(min_severity)
}


    // displays the view
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

    // Creates Rxjs polling
    const poll = of ({}).pipe(
        concatMap(() => from(fetch(url).then(r => r.json()))), //make api call
        map(response => response.warnings), // get warnings from array
        map(response => response.filter(r => r.severity > min_severity)), // filter severity
        tap(display), // takes response data to the display function above
        delay(3000), // adds delay 
        repeat() // repeat the polling
    );
    
    // toggles the subscribtion
    var toggleStream = fromEvent(toggle, 'change').pipe(
        map(e => e.target.checked));

    // shows the result
    var resultStream = toggleStream.pipe(
        filter(x => x === true),
        startWith(true),
        flatMap(() => poll.pipe(takeUntil(toggleStream))),
        );

    resultStream.subscribe(x => display.innerText += x)
  

}