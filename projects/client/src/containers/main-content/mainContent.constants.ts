export const Statuses: { [key in string]: 'idle' | 'loading' | 'failed' } = {
  Idle: 'idle',
  Loading: 'loading',
  Failed: 'failed',
};
export const ActionTypes = {
  FetchData: 'mainContent/fetchData',
};
export const Conditions = {
  New: 'new',
  Used: 'used',
};
