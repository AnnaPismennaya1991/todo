import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    state = { value: '' };

    // Срабатывает после render когда HTML добавился на страницу
    componentDidMount() {
        // Переносит фокус в input
        this.input.focus();
    }

    onChange = (event) => {
        const value = event.target.value;
        this.setState({value: value});
    }

    onKeyPress = (event) => {
        if (event.charCode === 13 && this.state.value) {
            this.props.addItems({ name: this.state.value, value: false });
            this.setState({ value: ''});
        }
    }

    render() {
        return (
            <div className='Todos-input'>
                <input className='main-input' onChange={this.onChange}

                    // Сохраняет ссылку на input в this.input
                    ref={(node) => this.input = node}

                    onKeyPress={this.onKeyPress}
                    value={this.state.value}
                    placeholder='What needs to be done?'/>
            </div>
        );
    }
}

export default Input;
