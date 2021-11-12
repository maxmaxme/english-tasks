import React, { useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';
import { AppContext } from '../../store/context';
import { Game as GameComponent } from '../../components/Game';
import { Actions } from '../../store/actions';

export const Game = ({ id }: {id: string}) => {
  const { state: { gamesList, isLoading, selectedGameId }, dispatch } = useContext(AppContext);
  const onBackClick = () => dispatch({ type: Actions.SET_SELECTED_GAME_ID, payload: undefined });
  const selectedGame = gamesList.find((game) => game.id === selectedGameId);

  const content = isLoading || !selectedGame ?
    <PanelSpinner /> :
    <GameComponent game={selectedGame!} />;

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={onBackClick} />}>{selectedGame?.name}</PanelHeader>
      {content}
    </Panel>
  );
};
