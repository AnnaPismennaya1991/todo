import React, { Component } from 'react';

class List extends Component {

    renderItems = () => {
        return this.props.items.map((item, index) => {
            return (
                <div className='MainInputDiv' key={index}>
                    <input className='InputCheckbox' type='checkbox' checked={item.value} />
                    <div className='InputDiv'>{ item.name }</div>
                </div>
            )
        });
    }

    render() {
        return (
            <div>{ this.renderItems() }</div>
        );
    }
}

export default List;
