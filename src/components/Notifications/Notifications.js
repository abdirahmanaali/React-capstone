import React, { Component } from 'react';
import './Notifications.css';

class Notifications extends Component {
    render() {
        return (
            <div className="notifications">
                {this.props.error ?
                    <React.Fragment>
                        <img className="notifications__image" src="images/loader/captain-america.png" alt="Captain America"/>
                        <h3 className="notifications__message">Error obtaining the data</h3>
                    </React.Fragment>
                    :
                     <React.Fragment>
                        <img className="notifications__image" src="images/loader/thor.png" alt="Thor"/>
                        <h3 className="notifications__message notifications__message--info">No data</h3>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default Notifications;