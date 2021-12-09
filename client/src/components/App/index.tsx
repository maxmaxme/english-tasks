import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../store/context';
import { AppRoot, Root, View } from '@vkontakte/vkui';
import { GamesList as GamesListPanel } from '../../panels/GamesList';
import { Game as GamePanel } from '../../panels/Game';
import { Actions } from '../../store/actions';
import { Panel, PANELS } from '../../shared/types/panel';

export const App = () => {
  const { state: { history }, dispatch } = useContext(AppContext);

  const activePanel: Panel = history[history.length - 1] || PANELS.GAMES_LIST;
  const onSwipeBack = useCallback( () => {
    if (activePanel === PANELS.GAME) {
      dispatch({ type: Actions.SET_SELECTED_GAME_ID, payload: undefined });
    }
    dispatch({ type: Actions.POP_HISTORY, payload: undefined });
  }, [activePanel]);

  return (
    <AppRoot>
      <Root activeView="view">
        <View id="view" activePanel={activePanel} onSwipeBack={onSwipeBack} history={history}>
          <GamesListPanel id={PANELS.GAMES_LIST} />
          <GamePanel id={PANELS.GAME} />
        </View>
      </Root>
    </AppRoot>
  );
};
