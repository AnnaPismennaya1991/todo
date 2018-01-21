import React, { Component } from 'react';
import './Filters.css'

class Filters extends Component {

    render() {
        const { filters, items } = this.props;
        const falses = items.filter((item) => {
            return !item.value;
        });

        return (
            <div className='Filter-container'>
                <div className='items-left'>{ `${falses.length} items left` }</div>
                <div className='filter-button'>
                    <button className={ (!filters.active && !filters.completed) ? 'active' : '' } onClick={this.props.filterAll}>All</button>
                    <button className={ filters.active ? 'active' : '' } onClick={this.props.filterActive}>Active</button>
                    <button className={ filters.completed ? 'active' : '' } onClick={this.props.filterCompleted}>Completed</button>
                </div>
                <div className='filter-clear-completed'>
                    <button onClick={this.props.clearCompleted}>Clear completed</button>
                </div>
            </div>
        );
    }
}

export default Filters;
