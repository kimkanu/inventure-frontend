import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WebfontLoader, { WebFontConfig, WebFontStatus } from '@dr-kobros/react-webfont-loader';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'circular-std';
import './i18n';

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const webFontConfig: WebFontConfig = {
  custom: {
    families: ['Nanum Square'],
    urls: ['https://cdn.rawgit.com/hiun/NanumSquare/master/nanumsquare.css'],
  },
};

const onWebFontLoad = (status: WebFontStatus) => {};

ReactDOM.render(
  <WebfontLoader config={webFontConfig} onStatus={onWebFontLoad}>
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
