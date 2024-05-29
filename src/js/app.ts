// Import React and ReactDOM
import React from 'react';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';
// Import Framework7 Styles
import 'framework7/css/bundle';
// Import Framework7
import Framework7 from 'framework7/lite-bundle';
import { createRoot } from 'react-dom/client';

// Import App Component
import App from '@/components/app';
// Import Icons and App Custom Styles
import '@/css/app.scss';
import '@/css/global.css';
import '@/css/icons.css';

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));
