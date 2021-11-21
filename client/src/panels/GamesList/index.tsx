import React, { useContext } from 'react';
import { Panel, PanelHeader, PanelSpinner } from '@vkontakte/vkui';
import { AppContext } from '../../store/context';
import { GamesList as GamesListComponent } from '../../components/GamesList';

export const GamesList = ({ id }: {id: string}) => {
  const { state: { gamesList, isLoading } } = useContext(AppContext);
  const content = isLoading ?
    <PanelSpinner /> :
    <GamesListComponent games={gamesList} />;

  return (
    <Panel id={id}>
      <PanelHeader>English tests</PanelHeader>
      {content}
    </Panel>
  );
};
