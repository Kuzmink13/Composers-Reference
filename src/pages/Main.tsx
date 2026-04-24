/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import App from './App';
import About from './About';
// import Contact from './Contact';
import Scales from './Scales';
import References from './References';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const scalesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/scales',
  component: Scales,
});

const referencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/references',
  component: References,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  // contactRoute,
  scalesRoute,
  referencesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function Main() {
  return <RouterProvider router={router} />;
}

export default Main;
