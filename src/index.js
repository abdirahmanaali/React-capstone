import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Add this line to set the app element

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 