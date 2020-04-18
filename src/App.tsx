import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import store from './state/store';
import Home from './pages/Home';

function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
