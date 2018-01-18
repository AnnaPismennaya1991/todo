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

    render() {
        return (
            <div className='TodosInput'>
                <input onChange={this.onChange}/>
            </div>
        );
    }
}

export default Input;
