import React from 'react';
import Routes from './routes';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import allReducers from './reducers';

const store = createStore(allReducers);

const App = () => 
<Provider store={store}>
    <Routes />
</Provider>


export default App;;