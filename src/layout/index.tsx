import React, { Fragment } from 'react';

import Footers from './Footers';
import Headers from './Headers';
import Mains from './Mains';

const Layout: React.FC = () => (
  <Fragment>
    <Headers />
    <Mains />
    <Footers />
  </Fragment>
);

export default Layout;
