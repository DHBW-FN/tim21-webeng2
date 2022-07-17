/**
 * The App component is the root of our application.
 */
import React from 'react';
import { f7ready, App, View } from 'framework7-react';
import routes from '../js/routes';

export const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "Navigator", // App name
    theme: 'auto', // Automatic theme detection
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV ==='production' ? {
      path: '/service-worker.js',
    } : {},
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default MyApp;
