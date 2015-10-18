import { expect } from 'chai';
import networkService from '../../../../src/backend/service/network';
import sinon from 'sinon';

describe('Backend Network', () => {
    let network;
    let window;

    beforeEach(() => {
        window = {
            addEventListener: sinon.spy(),
            postMessage: sinon.spy(),
        };
        network = networkService(window);
    });

    it('should emit a message event when a message is sent from the frontend', (done) => {
        network.on('message', (message) => {
            expect(message).to.deep.equal({
                hello: 'world',
                source: 'restful-devtools-frontend',
            });
            done();
        });

        expect(window.addEventListener.getCall(0).args[0]).to.equal('message');
        const send = window.addEventListener.getCall(0).args[1];
        send({
            data: {
                test: 'test',
            },
        });
        send({
            data: {
                hello: 'world',
                source: 'restful-devtools-frontend',
            },
        });
    });

    it('should post a message on window when send event is reveived', () => {
        network.emit('send', {
            hello: 'world',
        });

        expect(window.postMessage.getCall(0).args).to.deep.equal([
            {
                hello: 'world',
                source: 'restful-devtools-backend',
            },
            '*',
        ]);
    });
});
