import { thunk } from 'easy-peasy';

import { routes } from '../../config/routes';

export const onDisconnect = thunk(async (actions, history, helpers) => {
  try {
    const store = helpers.getStoreState();
    const wallet = store.entities.wallet;
    wallet.signOut();
    history.replace(routes.welcome);

  } catch (error) {
    console.log(`Error: ${error}`);

  } finally {
    document.location.reload();
  }
});
