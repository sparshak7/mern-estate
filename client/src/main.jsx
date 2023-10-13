import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from "notistack"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider autoHideDuration={2000}>
        <App />
      </SnackbarProvider>
    </PersistGate>
  </Provider>
);
