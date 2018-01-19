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
                <h1 className="app-title">todos</h1>
                <div className='app-div1'></div>
                <div className='app-div2'></div>
                <div className='app-shadow'>
                    <Input addItems={this.addItems} />
                    <List items={this.state.list}/>
                </div>
            </div>
        );
    }
}

export default App;
