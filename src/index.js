import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

WebFont.load({
    google: {
        families: ['Roboto+Mono', 'Material+Icons'],
    },
});
