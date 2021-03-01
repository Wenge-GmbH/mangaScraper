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
const MangaSingle = React.lazy(() => import('pages/MangaSingle'));
const MangaChapter = React.lazy(() => import('pages/MangaChapter'));

const Error404 = React.lazy(() => import('pages/Error404'));

const MainRouter = () => {
  return (
    <CustomThemeProvider>
      <div className="main-content__wrapper">
        <Search />
        <div className="main-content">
          <div className="bg-white">
            <Suspense fallback={null}>
              <Nav />
              <Switch>
                {/* <ProtectedRoute exact path="/novels" component={Home} /> */}
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/manga/:id" component={MangaSingle} />
                <ProtectedRoute
                  exact
                  path="/manga/:id/:chapter_id"
                  component={MangaChapter}
                />
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
      </div>
    </CustomThemeProvider>
  );
};

export default MainRouter;
