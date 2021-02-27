import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Nav } from './Nav';
// import { Footer } from './Footer';
import ProtectedRoute from './protectedRoute';
import { CustomThemeProvider } from 'ui/theme/ThemeProvider';
import { Search } from 'components/Search/Search';

const Dashboard = React.lazy(() => import('pages/Dashboard'));
const SearchPage = React.lazy(() => import('pages/Search'));
const Novel = React.lazy(() => import('pages/Novel'));
const Chapter = React.lazy(() => import('pages/Chapter'));
const Login = React.lazy(() => import('pages/Login'));

const Error404 = React.lazy(() => import('pages/Error404'));
const Impressum = React.lazy(() => import('pages/Impressum'));
const Datenschutz = React.lazy(() => import('pages/Datenschutz'));

export default class MainRouter extends Component {
  render() {
    return (
      <CustomThemeProvider>
        <div className="main-content__wrapper">
          <Search />
          <div className="main-content">
            <Suspense fallback={null}>
              <Nav />
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
                <ProtectedRoute exact path="/search" component={SearchPage} />
                <ProtectedRoute exact path="/" component={Dashboard} />
                <Route path="/" component={Error404} />
              </Switch>
              {/* <Footer /> */}
            </Suspense>
          </div>
        </div>
      </CustomThemeProvider>
    );
  }
}
