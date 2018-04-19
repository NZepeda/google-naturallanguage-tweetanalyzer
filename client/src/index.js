import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

// Create Redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const AppWrapper = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
)
ReactDOM.render(
    <Provider store = {store}><AppWrapper/></Provider>,
     document.getElementById('root')
    );