import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./scrollToTop/ScrollToTop";
import { Provider } from "react-redux";
import { configureStore as createStore } from "@reduxjs/toolkit"
import mainReducer from "./redux/reducers/mainReducer"

const reduxStore = createStore({ reducer: mainReducer })
const root = ReactDOM.createRoot(document.getElementById('root')); //se conecta con el index html para que se imprima. 
root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

