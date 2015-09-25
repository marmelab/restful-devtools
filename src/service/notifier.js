import {EventEmitter} from 'events';

export default function(restful) {
    const _emitter = new EventEmitter();
    _emitter.on('error', () => true); // Add a default error listener to prevent unwanted exception

    restful.on('error', (error, config) => {
        const propertiesNames = Object.getOwnPropertyNames(error);
        const serializedError = {};

        for (const i in propertiesNames) {
            if (!propertiesNames.hasOwnProperty(i)) {
                return;
            }

            serializedError[propertiesNames[i]] = error[propertiesNames[i]];
        }

        _emitter.emit('error', config, serializedError);
    });

    restful.on('request', (config) => _emitter.emit('request', config));

    restful.on('response', (response, config) => _emitter.emit('response',
        config,
        {
            body: response.body(false),
            headers: response.headers(),
            statusCode: response.statusCode(),
        },
    ));

    return _emitter;
}
