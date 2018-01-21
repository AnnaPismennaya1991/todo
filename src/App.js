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

        // side effect - bug
        // immutable - нужен для  исключения side effects

        // mutalbe - неправильный стиль
        // item.hello => undefined
        // mainList.push(item);
        // mainList[0].hello = 12
        // item.hello => 12

        // immutable - правильный стиль
        // item.hello => undefined
        // mainList.push({ ...item }) // создаем новый объект и разворачиваем в него старый
        // mainList[0].hello = 12
        // item.hello => undefined

        mainList.push({ ...item });
        if (!this.state.filters.completed) {
            filteredList.push({ ...item });
        }
        this.setState({ mainList, filteredList });
    }

    toogleCheckbox = (index) => {
        // меняем value в объекте главного листа
        const { mainList } = this.state;
        mainList[index].value = !mainList[index].value;
        this.setState({ mainList });

        // генерю новый массив filteredList
        this.filter();
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
        const { filteredList, mainList } = this.state;

        this.setState({
            mainList: mainList.filter((item) => {
                return !item.value;
            }),
            filteredList: filteredList.filter((item) => {
                return !item.value;
            })
        });
    }

    filter = () => {
        const { mainList, filters } = this.state;

        const filteredList = mainList.filter((item) => {
            if (!filters.active && !filters.completed) {
                return true;
            }

            if (filters.active) {
                return !item.value;
            }

            return item.value;
        });

        this.setState({ filteredList });
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
