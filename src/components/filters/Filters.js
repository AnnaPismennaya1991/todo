import React, { Component } from 'react';
import './Filters.css'

class Filters extends Component {

    render() {
        const { filters, items } = this.props;

        // value: false - чтобы показать актуальное к-ство не выбранных items
        const falses = items.filter((item) => {
            // оставляем value: false
            return !item.value;
        });

        return (
            <div className='Filter-container'>
                <div className='main-layout'>
                    <div className='items-left'>{ `${falses.length} items left` }</div>
                    <div className='filter-button'>
                        {/* если active && completed - false, не выбраны фильтры и показываем все. */}
                        {/* назначаем кнопке All класс active */}
                        <button className={ (!filters.active && !filters.completed) ? 'active' : '' } onClick={this.props.filterAll}> All </button>
                        {/* назначаем кнопке Active класс active */}
                        <button className={ filters.active ? 'active' : '' } onClick={this.props.filterActive}> Active </button>
                        {/* назначаем кнопке completed класс active */}
                        <button className={ filters.completed ? 'active' : '' } onClick={this.props.filterCompleted}> Completed </button>
                    </div>
                    <div className='filter-clear-completed'>
                        <button onClick={this.props.clearCompleted}> Clear completed </button>
                    </div>
                </div>
                <div className='filter-layout1'></div>
                <div className='filter-layout2'></div>
            </div>
        );
    }
}

export default Filters;
