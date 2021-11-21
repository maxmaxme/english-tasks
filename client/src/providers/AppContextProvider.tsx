import React, { useEffect, useReducer } from 'react';
import { AppContext, AppContextInitialValue } from '../store/context';
import { reducer } from '../store/reducer';
import { Actions } from '../store/actions';
import { resolveGames } from '../resolvers/resolveGames';

const AppContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, AppContextInitialValue);

  useEffect(() => {
    Promise.all([
      resolveGames()
        .then((games) => dispatch({ type: Actions.SET_GAMES_LIST, payload: games }))
        .catch((e) => dispatch({ type: Actions.SET_GLOBAL_ERROR, payload: e.message })),
    ]).finally(() => {
      dispatch({ type: Actions.SET_IS_LOADING, payload: false });
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
