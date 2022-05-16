import React, { Component } from 'react';
export const UseSettings = React.createContext();

export default class settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 3,
            sort: 'Ascending',
            show: true,
        };
    }
    render() {
        return (
            <UseSettings.Provider value={this.state}>
                {this.props.children}
            </UseSettings.Provider>
        );
    }
}