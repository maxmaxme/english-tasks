import React, { useContext } from 'react';
import { GameList } from '../../shared/types/game';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';
import { SimpleCell } from '@vkontakte/vkui';
import { PANELS } from '../../shared/types/panel';

type Props = {
  game: GameList,
}

export const GamesListItem = ({ game }: Props) => {
  const { dispatch } = useContext(AppContext);
  const onClick = () => {
    dispatch({ type: Actions.SET_SELECTED_GAME_ID, payload: game.id });
    dispatch({ type: Actions.PUSH_HISTORY, payload: PANELS.GAME });
  };

  return (
    <SimpleCell onClick={onClick} expandable>{game.name}</SimpleCell>
  );
};
