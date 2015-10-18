import { expect } from 'chai';
import inspectorService from '../../../../src/backend/service/inspector';
import sinon from 'sinon';

describe('Backend Inspector', () => {
    let inspector;
    let window;

    beforeEach(() => {
        window = {
            clearInterval: sinon.spy(),
            setInterval: sinon.stub().returns(123),
        };
        inspector = inspectorService(window);
    });

    it('should register a callback with setInterval', () => {
        expect(typeof(window.setInterval.getCall(0).args[0])).to.equal('function');
        expect(window.setInterval.getCall(0).args[1]).to.equal(1e3);
    });

    it('should emit ready event with restful when it find it', (done) => {
        window.restful = {
            _instances: () => true,
        };

        inspector.on('ready', (restful) => {
            expect(window.clearInterval.getCall(0).args).to.deep.equal([123]);
            expect(restful).to.equal(window.restful);
            done();
        });

        const search = window.setInterval.getCall(0).args[0];
        search();
    });

    it('should emit error event when restful was not found', (done) => {
        inspector.on('error', () => {
            expect(window.clearInterval.getCall(0).args).to.deep.equal([123]);
            done();
        });

        const search = window.setInterval.getCall(0).args[0];
        for (let i = 0; i < 11; i++) {
            search();
        }
    });
});
