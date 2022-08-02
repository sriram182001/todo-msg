import { createStore } from 'redux';
import Reducer from './auth';
import TodoReducer from './todo';
import { combineReducers } from 'redux';
import {applyMiddleware, compose} from 'redux'
  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(combineReducers({Reducer,TodoReducer}),composeEnhancers(applyMiddleware()));

export default store;