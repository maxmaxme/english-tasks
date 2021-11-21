import React, { useContext } from 'react';
import { Game } from '../../shared/types/game';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';
import { SimpleCell } from '@vkontakte/vkui';

type Props = {
  game: Game,
}

export const GamesListItem = ({ game }: Props) => {
  const { dispatch } = useContext(AppContext);
  const onClick = () => dispatch({ type: Actions.SET_SELECTED_GAME_ID, payload: game.id });

  return (
    <SimpleCell onClick={onClick} expandable>{game.name}</SimpleCell>
  );
};
