import React, { useContext } from 'react';
import { AppContext } from '../../store/context';
import {
  AppRoot,
  View,
  Root,
} from '@vkontakte/vkui';
import { GamesList as GamesListPanel } from '../../panels/GamesList';
import { Game as GamePanel } from '../../panels/Game';

export const App = () => {
  const { state: { selectedGameId } } = useContext(AppContext);
  const activePanel = selectedGameId ? 'game' : 'games_list';

  return (
    <AppRoot>
      <Root activeView="view">
        <View id="view" activePanel={activePanel}>
          <GamesListPanel id="games_list" />
          <GamePanel id="game" />
        </View>
      </Root>
    </AppRoot>
  );
};
