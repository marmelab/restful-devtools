import { EventEmitter } from 'events';

export default function(port) {
    const emitter = new EventEmitter();
    emitter.on('error', () => true);

    port.onMessage.addListener((message) => {
        if (message.hasOwnProperty('restful')) {
            if (message.restful) {
                return emitter.emit('ready');
            }
            return emitter.emit('error');
        }

        emitter.emit('message', message);
    });

    port.onDisconnect.addListener(() => emitter.emit('disconnect'));

    emitter.on('send', (message) => {
        port.postMessage({
            ...message,
            source: 'restful-devtools-frontend',
        });
    });

    return emitter;
}
