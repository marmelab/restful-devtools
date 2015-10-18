import networkService from './service/network';
import inspector from './service/inspector';
import subscriber from './service/subscriber';

const network = networkService(window);

function boot() {
    inspector(window)
        .on('ready', (restful) => {
            network.emit('send', {
                restful: true,
            });

            const emitter = subscriber(restful);
            emitter.on('message', (message) => network.emit('send', message));
        })
        .on('error', () => {
            network.emit('send', {
                restful: false,
            });
        });
}

network.on('message', (incomingMessage) => {
    if (incomingMessage.hello) {
        boot();
    }
});
