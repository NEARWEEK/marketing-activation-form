import { Buffer } from 'buffer';

import { thunk } from 'easy-peasy';

import { routes } from "../../config/routes";
import { getNearApi } from "../helpers/getNearApi";
import { isRedirectFromWallet } from '../helpers/isRedirectFromWallet';

import { onLoadPage } from './onLoadPage';
import { onRedirectFromWallet } from './onRedirectFromWallet';

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const { setNearApi } = actions;

  try {
    setNearApi(await getNearApi());
    const state = helpers.getStoreState();

    if (isRedirectFromWallet(state, history)) {
      await onRedirectFromWallet(actions, history);
    } else {
      await onLoadPage(actions, state, history);
    }

    actions.clearTemporaryData();
    setInit(true);

  } catch (error) {
    console.log('onInitApp:', error);
    await history.replace(routes.errorPage);
  }
});
