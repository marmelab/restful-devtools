import JSONTree from 'react-json-tree';
import React, { Component, PropTypes } from 'react';
import Section from './Section';

export default class Response extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        theme: PropTypes.object,
    };

    render() {
        const { data, theme } = this.props;

        return (
            <Section title={`RESPONSE ${data.response.statusCode}`} url={data.config.url}>
                <JSONTree {...{data, theme}} />
            </Section>
        );
    }
 }
