import React, { useCallback, useContext } from 'react';
import { AppContext } from '../../store/context';
import { AppRoot, Root, View } from '@vkontakte/vkui';
import { GamesList as GamesListPanel } from '../../panels/GamesList';
import { GameRules as GameRulesPanel } from '../../panels/GameRules';
import { RulesItem as RulesItemPanel } from '../../panels/RulesItem';
import { Game as GamePanel } from '../../panels/Game';
import { Actions } from '../../store/actions';
import { getFallbackPanelId, getViewByPanelId, Panel, PANELS, View as ViewType, VIEWS } from '../../panels/navigation';

export const App = () => {
  const { state: { history, popout }, dispatch, goBack } = useContext(AppContext);

  const activePanel: Panel = history[history.length - 1] || PANELS.GAMES_LIST;
  const activeView: ViewType = getViewByPanelId(activePanel);
  const onSwipeBack = useCallback( () => {
    if (activePanel === PANELS.GAME_RULES) {
      dispatch({ type: Actions.SET_SELECTED_GAME_ID, payload: undefined });
    }
    goBack();
  }, [activePanel]);

  return (
    <AppRoot>
      <Root activeView={activeView} popout={popout}>
        <View id={VIEWS.MENU} activePanel={getFallbackPanelId(history, VIEWS.MENU)} onSwipeBack={onSwipeBack} history={history}>
          <GamesListPanel id={PANELS.GAMES_LIST} />
          <GameRulesPanel id={PANELS.GAME_RULES} />
          <RulesItemPanel id={PANELS.RULES_ITEM} />
        </View>
        <View id={VIEWS.GAME} activePanel={getFallbackPanelId(history, VIEWS.GAME)}>
          <GamePanel id={PANELS.GAME} />
        </View>
      </Root>
    </AppRoot>
  );
};
