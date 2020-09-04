import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';
import App from './routes/routes';
import * as serviceWorker from './serviceWorker';
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer';
import Thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(Thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();