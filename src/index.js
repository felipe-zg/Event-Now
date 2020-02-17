import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './routes';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import allReducers from './reducers';

const store = createStore(allReducers);

const App = () => 
<Provider store={store}>
    <StatusBar barStyle="light-content" backgroundColor="#612F74" />
    <Routes />
</Provider>


export default App;;