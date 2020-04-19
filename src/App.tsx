import React, { useEffect } from 'react';
import './App.css';
import './i18n';
import { Provider } from 'react-redux';
import store from './state/store';
import Home from './pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Room from './pages/Room';
import { version } from '../package.json';
import FireAuth from './components/FireAuth';
import { RouteTransitionProvider } from 'react-route-transition';

function App() {
  useEffect(() => {
    console.log(`The Gives — Version ${version}`);
  }, []);
  return (
    <Provider store={store}>
      <FireAuth>
        <Router>
          <RouteTransitionProvider>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/w/:roomId">
              <Room />
            </Route>
          </RouteTransitionProvider>
        </Router>
      </FireAuth>
    </Provider>
  );
}

export default App;
