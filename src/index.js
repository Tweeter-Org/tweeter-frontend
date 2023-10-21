import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './react-redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persiststore } from './react-redux/Store';

// store.subscribe(()=>console.log(store.getState()))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <PersistGate persistor={persiststore} >
    <App />
    </PersistGate>
    </Provider>
);

reportWebVitals();
