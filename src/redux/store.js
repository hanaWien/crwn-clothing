import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];
//store recieves root reducer and middlewares
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //spread middlewares - more scalable

export default store;