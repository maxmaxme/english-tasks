import React from 'react';
import { Group, Header } from '@vkontakte/vkui';
import { RulesListItem } from '../RulesListItem';
import { RulesList as RulesListType } from '../../shared/types/rules';

type Props = {
  rules: RulesListType,
}

export const RulesList = ({ rules }: Props) => {
  return (
    <Group>
      <Header mode="secondary">Правила</Header>
      {Object.values(rules).map((rule, i) => (
        <RulesListItem key={i} rule={rule} />
      ))}
    </Group>
  );
};
