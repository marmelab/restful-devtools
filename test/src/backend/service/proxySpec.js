import { expect } from 'chai';
import proxyService from '../../../../src/backend/service/proxy';
import sinon from 'sinon';

describe('Backend Proxy', () => {
    let port;
    let window;

    beforeEach(() => {
        port = {
            onMessage: {
                addListener: sinon.spy(),
            },
            onDisconnect: {
                addListener: sinon.spy(),
            },
            postMessage: sinon.spy(),
        };
        window = {
            addEventListener: sinon.spy(),
            postMessage: sinon.spy(),
            removeEventListener: sinon.spy(),
        };
        proxyService(window, port);
    });

    it('should emit a message on port when a message is received on window from backend', () => {
        expect(window.addEventListener.getCall(0).args[0]).to.equal('message');

        const send = window.addEventListener.getCall(0).args[1];
        send({
            data: {
                hello: 'world',
            },
        });
        send({
            data: {
                hello: 'world',
                source: 'restful-devtools-backend',
            },
        });

        expect(port.postMessage.getCall(0).args).to.deep.equal([
            {
                hello: 'world',
                source: 'restful-devtools-backend',
            },
        ]);
    });

    it('should emit a message on window when a message is received on port from frontend', () => {
        const send = port.onMessage.addListener.getCall(0).args[0];
        send({
            hello: 'world',
        });
        send({
            hello: 'world',
            source: 'restful-devtools-frontend',
        });

        expect(window.postMessage.getCall(0).args).to.deep.equal([
            {
                hello: 'world',
                source: 'restful-devtools-frontend',
            },
            '*',
        ]);
    });

    it('should emit a message on window when a disconnect event is received on port', () => {
        const disconnect = port.onDisconnect.addListener.getCall(0).args[0];
        disconnect();

        expect(window.postMessage.getCall(0).args).to.deep.equal([
            {
                disconnect: true,
                source: 'restful-devtools-frontend',
            },
            '*',
        ]);
        expect(window.removeEventListener.getCall(0).args).to.deep.equal([
            'message',
            window.addEventListener.getCall(0).args[1],
        ]);
    });
});
