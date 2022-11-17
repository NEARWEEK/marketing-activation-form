import { Buffer } from 'buffer';

import { thunk } from 'easy-peasy';

import { getNearApi } from "../helpers/getNearApi";
import { isRedirectFromWallet } from '../helpers/isRedirectFromWallet';

import { onLoadPage } from './onLoadPage';
import { onRedirectFromWallet } from './onRedirectFromWallet';

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const { setNearApi, setError } = actions;
  try {
    setNearApi(await getNearApi());
    const state = helpers.getStoreState();

    if (isRedirectFromWallet(state, history)) {
      await onRedirectFromWallet(actions, history);
    } else {
      await onLoadPage(state, history);
    }

    actions.clearTemporaryData();
    setInit(true);
  } catch (error) {
    console.log(`Error onInit App: ${error}`);
    setError({
      isError: true,
      description: 'Application is not loaded. Please try again letter.',
    });
  }
});
