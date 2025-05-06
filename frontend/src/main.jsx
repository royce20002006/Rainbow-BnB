import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider, Modal } from './context/Modal';
import { APIProvider } from '@vis.gl/react-google-maps';


const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <APIProvider
      apiKey="AIzaSyD9hXckDV5TBSd-CEeXq1jYOcmuXGX2wcw"
      libraries={['places']} // optional but recommended for full feature support
    >
    <ModalProvider>
    <Provider store={store}>
      <App />
      <Modal />
    </Provider>
    </ModalProvider>
    </APIProvider>
  </React.StrictMode>
);
