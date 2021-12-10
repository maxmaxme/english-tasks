import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';
import { resolveGamesList } from '../resolvers/resolveGames';
import { Actions } from '../store/actions';
import { PANELS } from '../panels/navigation';

const AppContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, AppContextInitialValue);

  useEffect(() => {
    resolveGamesList((list) => {
      dispatch({ type: Actions.SET_GAMES_LIST, payload: list });
    });
  }, []);

  useEffect(() => {
    const { selectedGameId, games, history } = state;
    let title = 'English tests';

    const gamePanels = [
      PANELS.GAME,
      PANELS.GAME_RULES,
    ];
    if (selectedGameId && gamePanels.includes(history[history.length - 1])) {
      const selectedGame = selectedGameId ? games[selectedGameId] : undefined;
      if (selectedGame) {
        title = selectedGame.name;
      } else {
        title = 'Loading...';
      }
    }
    document.title = title;
  }, [state.selectedGameId, state.games, state.history]);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      go: (panel) => dispatch({ type: Actions.PUSH_HISTORY, payload: panel }),
      goBack: () => dispatch({ type: Actions.POP_HISTORY }),
    }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
