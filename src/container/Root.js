import Error from '../component/Error';
import { fromJS, List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Request from '../component/Request';
import Response from '../component/Response';

/* eslint-disable new-cap */
export default class App extends Component {
    static propTypes = {
        notifier: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            data: List(),
            isVisible: true,
        };

        window.addEventListener('keydown', ::this._handleKeyPress);
    }

    componentDidMount() {
        const { notifier } = this.props;

        notifier.on('error', ::this._onError);
        notifier.on('request', ::this._onRequest);
        notifier.on('response', ::this._onResponse);
    }

    componentWillUnmount() {
        const { notifier } = this.props;

        notifier.removeAllListeners('error');
        notifier.removeAllListeners('request');
        notifier.removeAllListeners('response');
    }

    _handleKeyPress(event) {
        if (event.ctrlKey && event.keyCode === 72) { // Ctrl+H
            event.preventDefault();
            this.setState(({ isVisible }) => ({
                isVisible: !isVisible,
            }));
        }
    }

    _onError(config, error) {
        this.setState(({data}) => ({
            data: data.push(fromJS({ config, error: error, type: 'error' })),
        }));
    }

    _onRequest(config) {
        this.setState(({data}) => ({
            data: data.push(fromJS({ config, type: 'request' })),
        }));
    }

    _onResponse(config, response) {
        this.setState(({data}) => ({
            data: data.push(fromJS({ config, response: response, type: 'response' })),
        }));
    }

    _getTheme() {
        return {
            scheme: 'flat',
            author: 'chris kempson (http://chriskempson.com)',
            base00: '#2C3E50',
            base01: '#34495E',
            base02: '#7F8C8D',
            base03: '#95A5A6',
            base04: '#BDC3C7',
            base05: '#e0e0e0',
            base06: '#f5f5f5',
            base07: '#ECF0F1',
            base08: '#E74C3C',
            base09: '#E67E22',
            base0A: '#F1C40F',
            base0B: '#2ECC71',
            base0C: '#1ABC9C',
            base0D: '#3498DB',
            base0E: '#9B59B6',
            base0F: '#be643c',
        };
    }

    _renderError(data, key) {
        return <Error {...{data, key}} theme={this._getTheme()} />;
    }

    _renderRequest(data, key) {
        return <Request {...{data, key}} theme={this._getTheme()} />;
    }

    _renderResponse(data, key) {
        return <Response {...{data, key}} theme={this._getTheme()} />;
    }

    render() {
        const { data, isVisible } = this.state;

        if (!isVisible) {
            return null;
        }

        return (
            <div style={{
                backgroundColor: this._getTheme().base00,
                bottom: 0,
                boxShadow: '0px 0px 1px 0px #000',
                position: 'fixed',
                fontFamily: 'monaco, Consolas, Lucida Console, monospace',
                fontSize: '18px',
                fontWeight: 300,
                overflowY: 'auto',
                padding: '0 10px',
                right: 0,
                top: 0,
                width: '300px',
            }}>
                {data.map((datum, key) => {
                    switch (datum.get('type')) {
                    case 'error':
                        return this._renderError(datum.remove('type').toJS(), key);
                    case 'request':
                        return this._renderRequest(datum.remove('type').toJS(), key);
                    case 'response':
                        return this._renderResponse(datum.remove('type').toJS(), key);
                    default:
                        return null;
                    }
                })}
            </div>
        );
    }
 }
