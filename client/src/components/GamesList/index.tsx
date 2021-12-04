import React from 'react';
import { GameList } from '../../shared/types/game';
import { GamesListItem } from '../GamesListItem';
import { Group, Header, Spinner } from '@vkontakte/vkui';

type Props = {
  games: GameList[],
}

export const GamesList = ({ games }: Props) => {
  const loading = !games.length;

  return (
    <Group>
      <Header mode="secondary">Тесты</Header>
      {games.map((game, i) => (
        <GamesListItem key={i} game={game} />
      ))}
      {loading && <Spinner />}
    </Group>
  );
};
