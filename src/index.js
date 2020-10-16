import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'rc-time-picker/assets/index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './config/store'
import Routes from './config/routes';

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={ <p>Loading</p> } persistor={persistor}>
          <Routes/>
      </PersistGate>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
