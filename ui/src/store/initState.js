import { persist } from 'easy-peasy';

const initState = {
  error: {
    isError: false,
    description: '',
  },
  entities: {
    near: null,
    keyStore: null,
    wallet: null,
  },
  temporary: {},
};

export const persistInitState = persist(initState, {
  storage: 'localStorage',
  allow: ['temporary'],
});
