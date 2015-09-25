import JSONTree from 'react-json-tree';
import React, { Component, PropTypes } from 'react';
import Section from './Section';

export default class Error extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        theme: PropTypes.object,
    };

    render() {
        const { data, theme } = this.props;
        const title = data.error.response.statusCode ? `ERROR ${data.error.response.statusCode}` : 'ERROR';
        
        return (
            <Section title={title} titleColor="red" url={data.config.url}>
                <JSONTree {...{data, theme}} />
            </Section>
        );
    }
 }
