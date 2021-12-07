import React, { useEffect, useState } from 'react';
import { ConfigProvider, usePlatform, WebviewType } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { AppearanceScheme } from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProviderContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const platform = usePlatform();
  const lights = ['bright_light', 'client_light', 'vkcom_light'];

  const [scheme, setScheme] = useState<AppearanceScheme>('bright_light');

  useEffect(() => {
    function changeScheme(scheme: string) {
      const isLight = lights.includes(scheme);
      setScheme(isLight ? 'bright_light' : 'space_gray');

      if (bridge.supports('VKWebAppSetViewSettings')) {
        bridge.send('VKWebAppSetViewSettings', {
          'status_bar_style': isLight ? 'dark' : 'light',
          'action_bar_color': isLight ? '#ffffff' : '#191919',
        });
      }
    }

    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        // @ts-ignore
        changeScheme(data.scheme);
      }
    });

    bridge.send('VKWebAppInit');
  }, []);

  const isVkMiniApp = window.location.href.includes('vk_platform');
  return (
    <ConfigProvider
      platform={platform}
      scheme={scheme}
      webviewType={isVkMiniApp ? WebviewType.VKAPPS : WebviewType.INTERNAL}
    >
      {children}
    </ConfigProvider>
  );
};
export default AppContextProvider;
