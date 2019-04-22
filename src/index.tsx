import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebfontLoader, { WebFontConfig, WebFontStatus } from '@dr-kobros/react-webfont-loader';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'circular-std';
import './i18n';

// webfontloader configuration object. *REQUIRED*.
const config: WebFontConfig = {
  custom: {
    families: ['Nanum Square'],
    urls: ['https://cdn.rawgit.com/hiun/NanumSquare/master/nanumsquare.css'],
  },
};

// Callback receives the status of the general webfont loading process. *OPTIONAL*
const callback = (status: WebFontStatus) => {
  // I could hook the webfont status to for example Redux here.
};

ReactDOM.render(
  <WebfontLoader config={config} onStatus={callback}>
    <Router>
      <App />
    </Router>
  </WebfontLoader>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
