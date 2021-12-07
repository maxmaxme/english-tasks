import { AdaptivityProvider } from '@vkontakte/vkui';
import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import AppContextProvider from './providers/AppContextProvider';
import AppConfigProvider from './providers/AppConfigProvider';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

render(
  <AppContextProvider>
    <AppConfigProvider>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </AppConfigProvider>
  </AppContextProvider>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./js/sw.js');
}
