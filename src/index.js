import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Chat from './Chat';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// window.addEventListener('load', async (event) => {
//   if ('serviceWorker' in navigator) {
//     try {
//       const reg = await navigator.serviceWorker.register('/sw.js');
//       console.log('SW registered: ', reg);
//     } catch (e) {
//       console.error('SW registration failed: ' + e.message);
//     }
//   }
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Chat />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
