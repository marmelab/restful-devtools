import { EventEmitter } from 'events';

const SEARCH_INTERVAL_TIME = 1e3;
const SEARCH_MAX_TIME = 10e3;

export default function(window) {
    const emitter = new EventEmitter();
    emitter.on('error', () => true);

    let elapsedTime = 0;

    const intervalId = window.setInterval(() => {
        if (window.restful && typeof(window.restful._instances) === 'function') {
            window.clearInterval(intervalId);
            emitter.emit('ready', window.restful);
        }
        elapsedTime += SEARCH_INTERVAL_TIME;

        if (elapsedTime > SEARCH_MAX_TIME) {
            window.clearInterval(intervalId);
            emitter.emit('error');
        }
    }, SEARCH_INTERVAL_TIME);

    return emitter;
}
