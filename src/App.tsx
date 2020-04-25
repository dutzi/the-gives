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
import initI18n from './i18n';
import DirectionHelper from './DirectionHelper';
import About from './pages/About';
import CreateRoom from './pages/CreateRoom';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

initI18n();

function App() {
  useEffect(() => {
    console.log(`The Gives — Version ${version}`);
  }, []);

  return (
    <Provider store={store}>
      <DirectionHelper>
        <FireAuth>
          <Router>
            <RouteTransitionProvider>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/w/:roomId">
                <Room />
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
              <Route path="/terms-of-service">
                <TermsOfService />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/create-room/:provider/:videoId">
                <CreateRoom />
              </Route>
            </RouteTransitionProvider>
          </Router>
        </FireAuth>
      </DirectionHelper>
    </Provider>
  );
}

export default App;
