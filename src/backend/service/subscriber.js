import { EventEmitter } from 'events';

export default function(restful) {
    const emitter = new EventEmitter();

    function subscriber(instance) {
        instance.on('request:interceptor:pre', (previousConfig) => {
            instance.once('request:interceptor:post', (nextConfig) => {
                // @TODO diff
                console.log({ previous, nextConfig });
            });
        });

        instance.on('response:interceptor:pre', (previousResponse) => {
            instance.once('response:interceptor:post', (nextResponse) => {
                // @TODO diff

            });
        });

        instance.on('error:interceptor:pre', (previousError) => {
            instance.once('error:interceptor:post', (nextError) => {
                // @TODO diff

            });
        });

        instance.on('request', (config) => {
            emitter.emit('message', {
                type: 'request',
                config
            });
        });

        instance.on('response', (response) => {

        });

        instance.on('error', (error) => {

        });
    }

    setInterval(() => {
        const instances = restful._instances();
        if (!instances.length) {
            return;
        }

        instances.forEach(subscriber);
        restful._flush();
    }, 1000);

    return emitter;
}
