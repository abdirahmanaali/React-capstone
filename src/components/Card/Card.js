import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

    render() {
        const { data } = this.props;
        const imgSrc = `${data.thumbnail.path}/standard_large.${data.thumbnail.extension}`;
        return (
             <div className="card" onClick={() => this.props.selectedCharacter(data.id)}>
                <img className="card__image" src={imgSrc} alt={data.name}/>
                <h3 className="card__title">{data.name}</h3>
            </div>
        );
    }
}

export default Card;