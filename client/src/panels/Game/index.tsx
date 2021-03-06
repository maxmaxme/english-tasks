import React, { useContext, useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderClose, PanelSpinner } from '@vkontakte/vkui';
import { AppContext } from '../../store/context';
import { Game as GameComponent } from '../../components/Game';
import { Actions } from '../../store/actions';
import { resolveGameById } from '../../resolvers/resolveGames';
import { Icon28CancelOutline } from '@vkontakte/icons';

export const Game = ({ id: panelId }: {id: string}) => {
  const { state: { selectedGameId, games, gamesList }, dispatch, goBack } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const selectedGame = selectedGameId ? games[selectedGameId] : undefined;
  const selectedGameVersion = gamesList.find(({ id }) => id === selectedGameId)?.version || 1;

  useEffect(() => {
    if (!selectedGame && selectedGameId && !isLoading) {
      setIsLoading(true);
      resolveGameById(selectedGameId, selectedGameVersion)
        .then((game) => {
          dispatch({ type: Actions.APPEND_GAMES, payload: {
            [game.id]: game,
          } });
          setIsLoading(false);
        })
        .catch((e) => dispatch({ type: Actions.SET_GLOBAL_ERROR, payload: e.message }));
    }
  }, [selectedGameId]);

  const content = isLoading || !selectedGame ?
    <PanelSpinner /> :
    <GameComponent game={selectedGame} />;

  return (
    <Panel id={panelId}>
      <PanelHeader
        separator={false}
        left={<PanelHeaderClose data-test-id="GameBackButton" onClick={goBack}><Icon28CancelOutline /></PanelHeaderClose>}
      >
        {selectedGame?.name || 'Loading'}
      </PanelHeader>
      {content}
    </Panel>
  );
};
