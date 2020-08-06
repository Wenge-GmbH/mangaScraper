import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Nav } from './Nav';
import { Footer } from './Footer';

const Home = React.lazy(() => import('pages/Home'));

const Impressum = React.lazy(() => import('pages/Impressum'));
const Datenschutz = React.lazy(() => import('pages/Datenschutz'));

// const Legal = React.lazy(() => import('../pages/Legal'));

export default class MainRouter extends Component {
  render() {
    return (
      <>
        {/* <Nav /> */}

        <Suspense fallback={null}>
          <div className="main-content">
            <Switch>
              {/* <Route exact path="/legal/:slug" component={Legal} /> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/impressum" component={Impressum} />
              <Route exact path="/datenschutz" component={Datenschutz} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Suspense>
      </>
    );
  }
}
