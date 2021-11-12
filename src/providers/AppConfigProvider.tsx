import React, { useEffect, useState } from 'react';
import { ConfigProvider, usePlatform } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { AppearanceScheme } from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProviderContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const platform = usePlatform();

  const [scheme, setScheme] = useState<AppearanceScheme>('bright_light');
  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        // @ts-ignore
        const scheme = data.scheme;
        const isLight = ['bright_light', 'client_light'].includes(scheme);
        setScheme(isLight ? 'bright_light' : 'space_gray');
        bridge.send('VKWebAppSetViewSettings', {
          'status_bar_style': isLight ? 'dark' : 'light',
          'action_bar_color': isLight ? '#000' : '#FFF',
        });
      }
    });
  }, []);

  return (
    <ConfigProvider
      platform={platform}
      scheme={scheme}
    >
      {children}
    </ConfigProvider>
  );
};
export default AppContextProvider;
