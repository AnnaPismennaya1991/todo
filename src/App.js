import React, { Component } from 'react';

import Filters from './Filters';
import Input from './Input';
import List from './List';
import './App.css';

class App extends Component {
    state = {
        mainList: [],
        filteredList: [],
        filters: {
            active: false,
            completed: false
        }
    };

    addItems = (item) => {
        const { mainList, filteredList } = this.state;
        mainList.push(item);
        if (!this.state.filters.completed) {
            filteredList.push(item);
        }
        this.setState({ mainList, filteredList });
    }

    toogleCheckbox = (index) => {
        const { mainList } = this.state;
        mainList[index].value = !mainList[index].value;
        this.setState({ mainList });
    }

    removeItem = (index) => {
        const { mainList } = this.state;
        mainList.splice(index, 1);
        this.setState({ mainList });
    }

    filterAll = () => {
        const { mainList } = this.state;
        const filteredList = mainList;
        this.setState({ filteredList, filters: { completed: false, active: false } });
    }

    filterActive = () => {
        const { mainList } = this.state;
        const filteredList = mainList.filter((item) => {
            return !item.value;
        });

        this.setState({ filteredList, filters: { active: true } });
    }

    filterCompleted = () => {
        const { mainList } = this.state;
        const filteredList = mainList.filter((item) => {
            return item.value;
        });

        this.setState({ filteredList, filters: { completed: true } });
    }

    clearCompleted = () => {
        const { mainList } = this.state;
        const filteredList = mainList.filter((item) => {
            return !item.value;
        });

        this.setState({
            mainList: filteredList,
            filteredList: filteredList
        });
    }

    render() {
        return (
            <div className="App">
                <h1 className="app-title">todos</h1>
                <div className='app-div1'></div>
                <div className='app-div2'></div>
                <div className='app-shadow'>
                    <Input addItems={this.addItems} />
                    { !!this.state.mainList.length && <List items={this.state.filteredList} toogleCheckbox={this.toogleCheckbox} removeItem={this.removeItem}/> }
                    { !!this.state.mainList.length &&
                        <Filters items={this.state.mainList}
                            filterAll={this.filterAll}
                            filterActive={this.filterActive}
                            filterCompleted={this.filterCompleted}
                            clearCompleted={this.clearCompleted} />
                    }
                </div>
            </div>
        );
    }
}

export default App;
