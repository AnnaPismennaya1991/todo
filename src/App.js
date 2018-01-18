import React, { Component } from 'react';
import './App.css';
import Input from './Input';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-title">todos</h1>
                <Input />
            </div>
        );
    }
}

export default App;
