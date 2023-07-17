import React, { Component } from 'react';
import Routes from '../../Routes';
import './Error.css';

class PageError extends Component {

    validateRender = (currentPathname) => {
        const index = Routes.findIndex(el => el.path === currentPathname);
        return index === -1;
    }
 
    render() {
        const content = this.validateRender(this.props.location.pathname) ? (
            <div className="error">
                <img className="error__image" src="images/ironman.png" alt="Iron Man" />
                <div className="error__content">
                    <h1 className="error__title">Error 404</h1>
                    <h3 className="error__subtitle">Stop! It is a dangerous area</h3>
                    <button className="error__button" onClick={() => this.props.history.goBack()}>Return</button>
                </div>
            </div>
        ) : '';
        return content;
    }
}

export default PageError;