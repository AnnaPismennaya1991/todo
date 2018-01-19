import React, { Component } from 'react';
import './List.css';

class List extends Component {

    renderItems = () => {
        return this.props.items.map((item, index) => {
            return (
                <div className='checkbox-one-box' key={index}>

                    {/* <input className='checkbox' type='checkbox' checked={item.value} onChange={(event) => this.props.changeCheckbox(event, index)} /> */}

                    <div className={ item.value ? 'checkbox active' : 'checkbox' } onClick={() => this.props.toogleCheckbox(index)}>
                        { item.value && <div className='check'></div> }
                    </div>
                    <div className={ item.value ? 'checkbox-text active' : 'checkbox-text' }> { item.name } </div>
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
