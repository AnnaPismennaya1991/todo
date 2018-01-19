import React, { Component } from 'react';
import Input from './Input';
import List from './List';
import './App.css';

class App extends Component {
    state = { list: [] };

    addItems = (item) => {
        const { list } = this.state;
        list.push(item);
        this.setState({ list });
    }

    toogleCheckbox = (index) => {
        const { list } = this.state;
        list[index].value = !list[index].value;
        this.setState({ list });
    }

    render() {
        return (
            <div className="App">
                <h1 className="app-title">todos</h1>
                <div className='app-div1'></div>
                <div className='app-div2'></div>
                <div className='app-shadow'>
                    <Input addItems={this.addItems} />
                    <List items={this.state.list} toogleCheckbox={this.toogleCheckbox}/>
                </div>
            </div>
        );
    }
}

export default App;
