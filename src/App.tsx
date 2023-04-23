import React, { ReactNode, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './layout';

const lazyload = (children: ReactNode) => <Suspense>{children}</Suspense>;

const Market = React.lazy(() => import('@/pages/Market'));
const Hold = React.lazy(() => import('@/pages/Hold'));
const User = React.lazy(() => import('@/pages/User'));
const CheckIn = React.lazy(() => import('@/pages/CheckIn'));
const Answer = React.lazy(() => import('@/pages/Answer'));

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={lazyload(<Market />)} />
        <Route path="check-in" element={lazyload(<CheckIn />)} />
        <Route path="answer" element={lazyload(<Answer />)} />
        <Route path="hold" element={lazyload(<Hold />)} />
        <Route path="user" element={lazyload(<User />)} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
