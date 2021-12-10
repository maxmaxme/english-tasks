export const PANELS = {
  GAME_RULES: 'game_rules',
  GAMES_LIST: 'games_list',
  GAME: 'game',
};

export type PanelsKeys = keyof typeof PANELS;
export type Panel = typeof PANELS[PanelsKeys];

export const VIEWS = {
  MENU: 'menu',
  GAME: 'game',
};

export type ViewsKeys = keyof typeof VIEWS;
export type View = typeof VIEWS[ViewsKeys];

export const navigation = {
  [VIEWS.MENU]: [
    PANELS.GAMES_LIST,
    PANELS.GAME_RULES,
  ],
  [VIEWS.GAME]: [
    PANELS.GAME,
  ],
};

// Возвращает View, принадлежащий Panel
export const getViewByPanelId = (panel: Panel): View => {
  for (const view in navigation) {
    if (navigation[view].includes(panel)) {
      return view;
    }
  }
  return VIEWS.MENU;
};

// Возвращает последний Panel из истории, который есть в переданном View
export const getFallbackPanelId = (history: Panel[], view: View) => {
  const availablePanels = navigation[view];

  for (let i = history.length - 1; i >= 0; i--) {
    if (availablePanels.includes(history[i])) {
      return history[i];
    }
  }
  return availablePanels[0];
};
