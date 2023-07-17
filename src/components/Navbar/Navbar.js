import React, { Component } from 'react';
import { NavLink, Route, HashRouter } from 'react-router-dom';

import Routes from '../../Routes';
import PageError from '../../pages/Error/Error';
import './Navbar.css';

class Navbar extends Component {

    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <nav className="navbar">
                        <NavLink className="navbar__item--first" to="/">
                            <img className="navbar__img" src="images/marvel.png" alt="Marvel Logo" />
                         </NavLink>
                        <div>
                            <NavLink className="navbar__item" activeClassName="navbar__item--active" to="/">Home</NavLink>
                            <NavLink className="navbar__item" activeClassName="navbar__item--active" to="/comics">Comics</NavLink>
                            <NavLink className="navbar__item" activeClassName="navbar__item--active" to="/series">Series</NavLink>
                        </div>
                    </nav>

                    <div className="main-container">
                        {Routes.map((route, index) => (
                            <Route key={index} path={route.path} exact={route.exact} component={route.main} />
                        ))}
                        <Route component={PageError} />
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default Navbar;