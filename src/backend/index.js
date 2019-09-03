import networkService from './service/network';
import inspectorService from './service/inspector';
import subscriberService from './service/subscriber';

export default function backend(inspector, network, subscriber) {
    inspector
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

const network = networkService(window);
network.on('message', (incomingMessage) => {
    if (incomingMessage.hello) {
        backend(
            inspectorService(window),
            network,
            subscriberService
        );
    }
});
