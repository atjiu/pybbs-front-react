import React, {  } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="container">
        <Header />
        <Component {...matchProps} />
        <Footer />
      </div>
    )} />
  )
};

export default DefaultLayout;