import { EventEmitter } from 'events';

export default function(window) {
    const emitter = new EventEmitter();

    window.addEventListener('message', (event) => {
        const { data } = event;

        if (data.source !== 'restful-devtools-frontend') {
            return;
        }

        if (data.hasOwnProperty('disconnect') && data.disconnect) {
            emitter.emit('disconnect');
            return;
        }

        emitter.emit('message', data);
    });

    emitter.on('send', (message) => {
        window.postMessage({
            ...message,
            source: 'restful-devtools-backend',
        }, '*');
    });

    return emitter;
}
