import React, { useContext } from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { AppContext } from '../../store/context';
import { GamesList as GamesListComponent } from '../../components/GamesList';

export const GamesList = ({ id }: {id: string}) => {
  const { state: { gamesList } } = useContext(AppContext);

  return (
    <Panel id={id}>
      <PanelHeader>English tests</PanelHeader>
      <GamesListComponent games={gamesList} />
    </Panel>
  );
};
