import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import List from './List';

class App extends Component {
    state = { list: [] };

    addItems = (item) => {
        const { list } = this.state;
        list.push(item);
        this.setState({ list: list });
    }

    render() {
        return (
            <div className="App">
                <h1 className="App-title">todos</h1>
                <Input addItems={this.addItems} />
                <List  items={this.state.list}/>
            </div>
        );
    }
}

export default App;
