import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from './redux/app/store';
import store from './react-redux/Store';
import { Provider } from 'react-redux';

store.subscribe(()=>console.log(store.getState()))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

reportWebVitals();
