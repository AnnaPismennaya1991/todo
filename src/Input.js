import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState({value: value});
    }

    onKeyPress = (event) => {
        if (event.charCode === 13) {
            this.props.addItems({ name: this.state.value, value: false });
            this.setState({ value: ''});
        }
    }

    render() {
        return (
            <div className='Todos-input'>
                <input className='main-input' onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    value={this.state.value}
                    placeholder='What needs to be done?'/>
            </div>
        );
    }
}

export default Input;
