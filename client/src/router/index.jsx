import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Nav } from './Nav';
// import { Footer } from './Footer';
import ProtectedRoute from './protectedRoute';
import { CustomThemeProvider } from 'ui/theme/ThemeProvider';

const Dashboard = React.lazy(() => import('pages/Dashboard'));
const Novel = React.lazy(() => import('pages/Novel'));
const Chapter = React.lazy(() => import('pages/Chapter'));
const Login = React.lazy(() => import('pages/Login'));

const Error404 = React.lazy(() => import('pages/Error404'));
const Impressum = React.lazy(() => import('pages/Impressum'));
const Datenschutz = React.lazy(() => import('pages/Datenschutz'));

// const Legal = React.lazy(() => import('../pages/Legal'));

export default class MainRouter extends Component {
  render() {
    return (
      <CustomThemeProvider>
        <Nav />

        <Suspense fallback={null}>
          <div className="main-content">
            <Switch>
              {/* <ProtectedRoute exact path="/novels" component={Home} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/impressum" component={Impressum} />
              <Route exact path="/datenschutz" component={Datenschutz} />
              <ProtectedRoute exact path="/novel/:slug" component={Novel} />
              <ProtectedRoute
                exact
                path="/novel/:slug/:chapter"
                component={Chapter}
              />
              <ProtectedRoute exact path="/" component={Dashboard} />
              <Route path="/" component={Error404} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Suspense>
      </CustomThemeProvider>
    );
  }
}
