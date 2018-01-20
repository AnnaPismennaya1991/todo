import React, { Component } from 'react';
import './Filters.css'

class Filters extends Component {

    render() {
        return (
            <div className='Filter-container'>
                <div className='items-left'>{ `${this.props.items.length} items left` }</div>
                <div className='filter-button'>
                    <button onClick={this.props.filterAll}>All</button>
                    <button onClick={this.props.filterActive}>Active</button>
                    <button onClick={this.props.filterCompleted}>Completed</button>
                </div>
                <div className='filter-clear-completed'>
                    <button onClick={this.props.clearCompleted}>Clear completed</button>
                </div>
            </div>
        );
    }
}

export default Filters;
