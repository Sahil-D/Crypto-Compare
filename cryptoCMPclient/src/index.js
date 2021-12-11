import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
);
