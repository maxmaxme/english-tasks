import React, { useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, PanelSpinner } from '@vkontakte/vkui';
import { RulesItem as RulesItemComponent } from '../../components/RulesItem';
import { AppContext } from '../../store/context';

export const RulesItem = ({ id: panelId }: {id: string}) => {
  const { state: { selectedRuleId, rulesList }, goBack } = useContext(AppContext);
  const selectedRule = selectedRuleId ? rulesList[selectedRuleId] : undefined;

  const content = !selectedRule ?
    <PanelSpinner /> :
    <RulesItemComponent rule={selectedRule} />;

  return (
    <Panel id={panelId}>
      <PanelHeader separator={false} left={(
        <PanelHeaderBack data-test-id="RulesItemBackButton" onClick={goBack} />
      )}>{selectedRule?.name || 'Loading'}</PanelHeader>
      {content}
    </Panel>
  );
};
