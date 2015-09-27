import { EventEmitter } from 'events';
import { error as errorSerializer, response as responseSerializer } from './serializer';

export default function(restful) {
    const _emitter = new EventEmitter();
    _emitter.on('error', () => true); // Add a default error listener to prevent unwanted exception

    restful.on('error', (error, config) => _emitter.emit('error', config, errorSerializer(error)));
    restful.on('request', (config) => _emitter.emit('request', config));
    restful.on('response', (response, config) => _emitter.emit('response', config, responseSerializer(response)));

    return _emitter;
}
