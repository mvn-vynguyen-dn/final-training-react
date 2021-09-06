import React, {Suspense, lazy} from 'react';
import { Switch, Route } from 'react-router-dom';

const CardDetail = lazy(() => import('./CardDetail'));
const AboutUs = lazy(() => import('./AboutUs'));
const Home = lazy(() => import('./Home'));

const Features = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/card/:id">
            <CardDetail />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default Features;
