import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import store from './state/store';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Room from './pages/Room';

function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/w/:videoId">
          <Room />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
