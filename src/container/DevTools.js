import debug from '../service/debug';
import EntryList from '../component/EntryList';
import { fromJS, List } from 'immutable';
import React, { Component, PropTypes } from 'react';

/* eslint-disable new-cap */
export default class Devtools extends Component {
    static propTypes = {
        restful: PropTypes.object.isRequired,
        visibleOnLoad: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        const { restful, visibleOnLoad = true } = props;

        this.debug = debug(restful);

        this.state = {
            entries: List(),
            isVisible: visibleOnLoad,
        };

        window.addEventListener('keydown', ::this._handleKeyPress);
    }

    componentDidMount() {
        this.debug.on('error', ::this._onDebugEvent('error'));
        this.debug.on('request', ::this._onDebugEvent('request'));
        this.debug.on('response', ::this._onDebugEvent('response'));
    }

    componentWillUnmount() {
        this.debug.removeAllListeners('error');
        this.debug.removeAllListeners('request');
        this.debug.removeAllListeners('response');
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

    _handleKeyPress(event) {
        if (event.ctrlKey && event.keyCode === 72) { // Ctrl+H
            event.preventDefault();
            this.setState(({ isVisible }) => ({
                isVisible: !isVisible,
            }));
        }
    }

    _onDebugEvent(type) {
        return (config, payload) => {
            this.setState(({entries}) => ({
                entries: entries.push(fromJS({ config, payload, type })),
            }));
        };
    }

    render() {
        const { entries, isVisible } = this.state;
        const theme = this._getTheme();

        if (!isVisible) {
            return null;
        }

        return <EntryList {...{entries: entries.toJS(), theme}} />;
    }
 }
