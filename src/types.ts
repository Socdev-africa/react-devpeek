export type Theme = 'light' | 'dark' | 'system';

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type StateAdapter = {
  name: string;
  getState: () => Record<string, any>;
  subscribe?: (callback: () => void) => (() => void) | void;
};

export type StorageItem = {
  key: string;
  value: string;
  type: 'localStorage' | 'sessionStorage';
};

export interface DevPeekProps {
  /**
   * Whether to show the DevPeek panel even in production
   * @default false
   */
  showInProduction?: boolean;

  /**
   * The position of the toggle button
   * @default 'bottom-right'
   */
  position?: Position;

  /**
   * The theme of the DevPeek panel
   * @default 'system'
   */
  theme?: Theme;

  /**
   * The initial visibility state of the panel
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * State adapters to connect external state to the DevPeek panel
   * @example [{ name: 'myZustandStore', getState: myStore.getState, subscribe: myStore.subscribe }]
   */
  stateAdapters?: StateAdapter[];

  /**
   * Whether to enable localStorage debugging
   * @default true
   */
  enableLocalStorage?: boolean;

  /**
   * Whether to enable sessionStorage debugging
   * @default true
   */
  enableSessionStorage?: boolean;
}