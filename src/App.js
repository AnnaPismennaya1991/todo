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

    componentWillMount() {
        // localStorage.getItem - получает строку items из localStorage
        // JSON.parse - превращает строку items в массив объектов

        const mainList = JSON.parse( localStorage.getItem('items') || '[]' );
        const filters = JSON.parse( localStorage.getItem('filters') || '{}' );

        // setState - асихронная функция, принимает 2 параметра
        // 1 параметр - объект нового стейта
        // 2 параметр - callback (this.filter - будет вызван после обновления стейта)
        this.setState({ mainList, filters }, this.filter);
    }

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

        // localStorage.setItem - создает либо изменяет переменную items и присвает ей второй параметр
        // 1 параметр - название переменной
        // 2 параметр - значение переменной
        // JSON.stringify - превращает любую переменную (в данном случае массив объектов) в строку
        localStorage.setItem('items', JSON.stringify(mainList));

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
        this.setState({ filters: { completed: false, active: false } }, this.filter);
    }

    // active: true
    filterActive = () => {
        // Обновляем состояние
        this.setState({ filters: { active: true } }, this.filter);
    }

    // completed: true
    filterCompleted = () => {
        this.setState({ filters: { completed: true } }, this.filter);
    }

    // очищаем завершенные дела
    // Удаляем элементы, у которых value === true (выбранные)
    clearCompleted = () => {
        const { filteredList, mainList } = this.state;

        const newMainList = mainList.filter((item) => {
            // return - оставить false, удаляет все true
            return !item.value;
        });

        const newFilteredList = filteredList.filter((item) => {
            // return - оставить false, удаляет все true
            return !item.value;
        });

        this.setState({ mainList: newMainList, filteredList: newFilteredList }, () => {
            localStorage.setItem('items', JSON.stringify(newMainList));
        });
    }

    filter = () => {
        const { mainList, filters } = this.state;
        localStorage.setItem('items', JSON.stringify(mainList));
        localStorage.setItem('filters', JSON.stringify(filters));

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

        const newMainList = mainList.map((item) => {
            // меняет все value на status
            return { ...item, value: status };
        });

        const newFilteredList = filteredList.map((item) => {
            // меняет все value на status
            return { ...item, value: status };
        });

        this.setState({ mainList: newMainList, filteredList: newFilteredList }, () => {
            localStorage.setItem('items', JSON.stringify(newMainList));
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
