import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store";


import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
 
  <App />
  
  </BrowserRouter>
  
  </Provider>,  
  document.getElementById("root")
);
