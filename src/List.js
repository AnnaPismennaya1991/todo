import React, { Component } from 'react';
import './List.css';

class List extends Component {

    renderItems = () => {
        return this.props.items.map((item, index) => {
            return (
                <div className='checkbox-one-box' key={index}>
                    <input className='checkbox' type='checkbox' checked={item.value} />
                    <div className='checkbox-text'>{ item.name }</div>
                </div>
            )
        });
    }

    render() {
        return this.props.items.length ? (
            <div className='checkbox-all-boxes'>{ this.renderItems() }</div>
        ) : null;
    }
}

export default List;
