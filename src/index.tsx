import { AdaptivityProvider } from '@vkontakte/vkui';
import React from 'react';
import { render } from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { App } from './components/App';
import AppContextProvider from './providers/AppContextProvider';
import AppConfigProvider from './providers/AppConfigProvider';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

bridge.send('VKWebAppInit', {});
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
