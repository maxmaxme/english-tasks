import React, { useEffect, useState } from 'react';
import { ConfigProvider, usePlatform, WebviewType } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { AppearanceSchemeType } from '@vkontakte/vk-bridge/dist/types/src/types/data';

const getTheme = (isLight: boolean): AppearanceSchemeType => isLight ? 'bright_light' : 'space_gray';
const getStatusBarColor = (isLight: boolean): string => isLight ? '#ffffff' : '#191919';

function changeScheme(isLight: boolean, setScheme: (scheme: AppearanceSchemeType) => void) {
  setScheme(getTheme(isLight));

  if (bridge.supports('VKWebAppSetViewSettings')) { // mini app
    bridge.send('VKWebAppSetViewSettings', {
      'status_bar_style': isLight ? 'dark' : 'light', // верхний цвет иконок
      'action_bar_color': getStatusBarColor(isLight), // верняя панель, андроид
      'navigation_bar_color': getStatusBarColor(isLight), // нижняя панель, андроид
    });
  } else { // web
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', getStatusBarColor(isLight));
  }
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const platform = usePlatform();
  const isVkMiniApp = window.location.href.includes('vk_platform');
  const isPWA = window.location.href.includes('pwa');

  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [scheme, setScheme] = useState<AppearanceSchemeType>(getTheme(!isDark));

  useEffect(() => {
    if (isVkMiniApp) {
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === 'VKWebAppUpdateConfig') {
          // @ts-ignore
          const isLight = ['bright_light', 'client_light', 'vkcom_light'].includes(data.scheme);
          changeScheme(isLight, setScheme);
        }
      });

      bridge.send('VKWebAppInit');
    } else {
      changeScheme(!isDark, setScheme);
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches: isDark }) => {
          changeScheme(!isDark, setScheme);
        });
    }
  }, []);

  return (
    <ConfigProvider
      isWebView={isPWA ? true : undefined}
      platform={platform}
      scheme={scheme}
      webviewType={isVkMiniApp ? WebviewType.VKAPPS : WebviewType.INTERNAL}
    >
      {children}
    </ConfigProvider>
  );
};
export default AppContextProvider;
