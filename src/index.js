import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
  <Provider store={store}>
  <App />
  </Provider>
</Router>
  
);
