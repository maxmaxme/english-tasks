import React, { useContext } from 'react';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';
import { SimpleCell } from '@vkontakte/vkui';
import { PANELS } from '../../panels/navigation';
import { Rule } from '../../shared/types/rules';

type Props = {
  rule: Rule,
}

export const RulesListItem = ({ rule }: Props) => {
  const { dispatch, go } = useContext(AppContext);
  const onClick = () => {
    dispatch({ type: Actions.SET_SELECTED_RULE_ID, payload: rule.id });
    go(PANELS.RULES_ITEM);
  };

  return (
    <SimpleCell data-test-id="RulesListItem" onClick={onClick} expandable>{rule.name}</SimpleCell>
  );
};
