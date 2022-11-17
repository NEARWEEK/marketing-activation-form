import { createStore } from 'easy-peasy';

import { actions } from './actions';
import { persistInitState } from './initState';
import { thunks } from './thunks';

export const store = createStore(
  {
    ...persistInitState,
    ...actions,
    ...thunks,
  },
  {
    name: 'MarketingActivationForm',
  }
);
