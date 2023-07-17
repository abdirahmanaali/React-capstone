import React, { Component } from 'react';
import './Loading.css';
const IMAGES = [
    'images/loader/ironman.png',
    'images/loader/captain-america.png',
    'images/loader/hulk.png',
    'images/loader/spiderman.png',
    'images/loader/thor.png'
];

class Loading extends Component {

    generateRandom = () => {
        const rnd = Math.floor(Math.random() * IMAGES.length);
        return IMAGES[rnd];
    }
 
    render() {
        return (
            <div className="loading">
                <div className="container__loading">
                    <img className="loading__image" src={this.generateRandom()} alt="Hero Loading"/>
                    <div className="container__loading--shadown">Loading...</div>
                </div>
            </div>
        );
    }
}

export default Loading;