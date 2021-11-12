import React from 'react';
import { Game } from '../../types/game';
import { GamesListItem } from '../GamesListItem';
import { Group, Header } from '@vkontakte/vkui';

type Props = {
  games: Game[],
}

export const GamesList = ({ games }: Props) => {
  return (
    <Group>
      <Header mode="secondary">Тесты</Header>
      {games.map((game, i) => (
        <GamesListItem key={i} game={game} />
      ))}
    </Group>
  );
};
