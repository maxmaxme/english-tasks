import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';
import { resolveGamesList } from '../resolvers/resolveGames';
import { Actions } from '../store/actions';

const AppContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, AppContextInitialValue);

  useEffect(() => {
    resolveGamesList((list) => {
      dispatch({ type: Actions.SET_GAMES_LIST, payload: list });
    });
  }, []);

  useEffect(() => {
    const { selectedGameId, games } = state;
    let title = 'English tests';
    if (selectedGameId) {
      const selectedGame = selectedGameId ? games[selectedGameId] : undefined;
      if (selectedGame) {
        title = selectedGame.name;
      } else {
        title = 'Loading...';
      }
    }
    document.title = title;
  }, [state.selectedGameId, state.games]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
