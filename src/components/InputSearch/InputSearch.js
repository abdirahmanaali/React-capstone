import React, { Component } from 'react';
import './InputSearch.css';

export default class InputSearch extends Component {

    searchValue = (e, isButton) => {
        if (e.keyCode === 13 || isButton)
            this.props.onSearch(this.refs.input.value);
    }

    render() {
        return (
            <div className={`input__group ${this.props.className ? this.props.className : ''}`}>
                <input onKeyDown={this.searchValue} type="text" placeholder={this.props.placeHolder} ref="input"/>
                <button onClick={(e) => this.searchValue(e, true)} className="button__search"><i className="material-icons">search</i></button>
            </div>
        )
    } 
}
