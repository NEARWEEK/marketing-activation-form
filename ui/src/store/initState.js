import { persist } from 'easy-peasy';

const initState = {
  entities: {
    near: null,
    keyStore: null,
    wallet: null,
  },
  temporary: {},
  marketingFromId: null,
};

export const persistInitState = persist(initState, {
  storage: 'localStorage',
  allow: ['temporary', 'marketingFromId'],
});
