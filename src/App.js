import React, { Component } from 'react';

import Filters from './components/filters/Filters';
import Input from './components/input/Input';
import List from './components/list/List';
import './App.css';

// в классе App храним переменные и state
class App extends Component {
    state = {
        mainList: [],
        filteredList: [],
        //  выбран объект All (не выбран active, completed)
        // { active: false, completed: false } => All
        // { active: true, completed: false } => Active
        // { active: false, completed: true } => Completed
        filters: {
            active: false,
            completed: false
        }
    };

    // Добавляет строку в this.state.mainList => List
    addItems = (item) => {
        // сокращаем строку this.state.mainList, чтобы можно было обращаться прямо к mainList
        const { mainList, filteredList } = this.state;

        // side effect - bug
        // immutable - (неизменный) нужен для  исключения side effects

        // mutalbe - (изменчивый) неправильный стиль
        // item.hello => undefined
        // mainList.push(item);
        // mainList[0].hello = 12
        // item.hello => 12

        // immutable - (неизменный) правильный стиль
        // item.hello => undefined
        // mainList.push({ ...item }) // создаем новый объект и разворачиваем в него старый
        // mainList[0].hello = 12
        // item.hello => undefined

        //...spread - oператор расширения
        // item === { name: 'fffff', value: false }
        // value у нового item всегда будет false
        mainList.push({ ...item });
         // новые item идут только в active && all
        if (!this.state.filters.completed) {
            filteredList.push({ ...item });
        }
        // функция обновления состояния mainList, filteredList
        this.setState({ mainList, filteredList });
    }

    // Переключает статус item
    toggleCheckbox = (index) => {
        // деструктрурируем mainList из this.state
        // this.state - объект содержащий mainList
        // деструктор достает mainList из объекта this.state
        // если this.state не имеет свойства mainList - вернется undefined
        const { mainList } = this.state;

        // меняем value в объекте главного листа
        mainList[index].value = !mainList[index].value;

        // обновляем главный лист
        this.setState({ mainList });

        // фильтруем массив (создаем новый filteredList)
        this.filter();
    }

    // удаляем строку в list
    removeItem = (index) => {
        const { mainList } = this.state;
        // splice() изменяет содержимое массива, удаляет существующие элементы и добавляет новые.
        // mainList.splice(index, 1);

        // Создаем новый массив методом filter.
        // Возвращаем все элементы, у которых _index не равен переданному index
        const newList = mainList.filter((item, _index) => _index !== index);

        // setState - асинхронная функция, поэтому вызываем фильтр только после обновления стейта в callback
        this.setState({ mainList: newList }, this.filter);
    }

    // Приводит фильтры к стартовому состоянию All
    filterAll = () => {
        const { mainList } = this.state;
        const filteredList = mainList;
        this.setState({ filteredList, filters: { completed: false, active: false } });
    }

    // active: true
    filterActive = () => {
        const { mainList } = this.state;
        const filteredList = mainList.filter((item) => {
            return !item.value;
        });

        // Обновляем состояние
        this.setState({ filteredList, filters: { active: true } });
    }

    // completed: true
    filterCompleted = () => {
        const { mainList } = this.state;
        const filteredList = mainList.filter((item) => {
            return item.value;
        });

        this.setState({ filteredList, filters: { completed: true } });
    }

    // очищаем завершенные дела
    // Удаляем элементы, у которых value === true (выбранные)
    clearCompleted = () => {
        const { filteredList, mainList } = this.state;

        this.setState({

            mainList: mainList.filter( (item) => {
                // return - оставить false, удаляет все true
                return !item.value;
            }
        ),

            filteredList: filteredList.filter((item) => {
                // return - оставить false, удаляет все true
                return !item.value;
            })
        });
    }

    filter = () => {
        const { mainList, filters } = this.state;

        const filteredList = mainList.filter((item) => {
            if (!filters.active && !filters.completed) {
                // return - оставить all
                return true;
            }

            if (filters.active) {
                // return - оставить false, удаляет все true. получаем active
                return !item.value;
            }
            // return - оставить true, удаляет все false, получаем completed
            return item.value;
        });

        this.setState({ filteredList });
    }

    toggleAll = (status) => {
        const { filteredList, mainList } = this.state;

        this.setState({
            mainList: mainList.map((item) => {
                // меняет все value на status
                return { ...item, value: status };
            }),
            filteredList: filteredList.map((item) => {
                // меняет все value на status
                return { ...item, value: status };
            })
        });
    }

    render() {
        return (
            <div className="App">
                <h1 className="app-title"> todos </h1>
                <div className='app-div1'></div>
                <div className='app-div2'></div>
                <div className='app-shadow'>
                    <Input addItems={this.addItems} toggleAll={this.toggleAll} />
                    { !!this.state.mainList.length &&
                        <List items={this.state.filteredList}
                            toggleCheckbox={this.toggleCheckbox}
                            removeItem={this.removeItem}/>
                    }
                    { !!this.state.mainList.length &&
                        <Filters items={this.state.mainList}
                            filters={this.state.filters}
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
