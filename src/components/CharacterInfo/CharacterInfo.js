import React, { Component } from 'react';
import './CharacterInfo.css';

class CharacterInfo extends Component {
    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {data ? <div className="backdrop" onClick={this.props.close}></div> : ''}
                <div className={`character-info ${data ? 'character-info--visible' : ''}`}>
                    {data ?
                        <React.Fragment>
                            <div className="character-info__header">
                                <button className="character-info__button" onClick={this.props.close}>
                                     <i className="material-icons">clear</i>
                                </button>
                                <img className="character-info__image" src={`${data.thumbnail.path}/standard_large.${data.thumbnail.extension}`} alt={data.name}/>
                                <h2 className="character-info__title">{data.name}</h2>
                            </div>
                            <div className="character-info__content">
                                {data.description}
                                <div className="character-info__link-content">
                                    {data.urls.map((el, index) => <a key={index} href={el.url} target="blank">{el.type}</a>)}
                                </div>
                            </div>
                            <div className="character-info__content">
                                <a className="character-info__link" href={data.comics.collectionURI} target="blank">comics</a>
                                <h6 className="character-info__available">Available: <span className="emphasize">{data.comics.available}</span> </h6>
                                <ul className="character-info__list">
                                    {data.comics.items.slice(0, 5).map((el, index) => <li key={index}>{el.name}</li>)}
                                </ul>
                            </div>
                            <div className="character-info__content">
                                <a className="character-info__link" href={data.stories.collectionURI} target="blank">stories</a>
                                <h6 className="character-info__available">Available: <span className="emphasize">{data.stories.available}</span> </h6>
                                <ul className="list-story">
                                    {data.stories.items.slice(0, 5).map((el, index) => {
                                        return <li className={`list-story__item ${el.type === 'interiorStory' ? 'story--interior' : 'story--cover'}`} key={index}>
                                            {el.name}
                                            {el.type === 'interiorStory' ? <i className="material-icons" title="Interior">assignment_returned</i> : <i className="material-icons" title="Cover">assignment_ind</i> }
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="character-info__content">
                                <a className="character-info__link" href={data.series.collectionURI} target="blank">series</a>
                                <h6 className="character-info__available">Available: <span className="emphasize">{data.series.available}</span> </h6>
                                <ul className="character-info__list">
                                    {data.series.items.slice(0, 5).map((el, index) => <li key={index}>{el.name}</li>)}
                                </ul>
                            </div>
                        </React.Fragment> : ''
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default CharacterInfo;