import React from 'react';
import { Rule, RULES_TYPES } from '../../shared/types/rules';
import { Transcriptions } from '../Transcriptions';
import { Spinner } from '@vkontakte/vkui';

type Props = {
  rule: Rule,
}

export const RulesItem = ({ rule }: Props) => {
  switch (rule.type) {
  case RULES_TYPES.TRANSCRIPTIONS:
    return <Transcriptions />;
  default:
    return <Spinner />;
  }
};
