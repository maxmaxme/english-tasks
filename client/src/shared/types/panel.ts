export const PANELS = {
  GAME: 'game',
  GAMES_LIST: 'games_list',
};

export type PanelsKeys = keyof typeof PANELS;
export type Panel = typeof PANELS[PanelsKeys];
