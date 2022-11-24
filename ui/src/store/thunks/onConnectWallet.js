import { Buffer } from 'buffer';

import { thunk } from 'easy-peasy';

import { daoConfig } from '../../config/nearConfig';
import { redirectPages } from '../../config/redirectPages';
import { getRoute } from '../../config/routes';

const { contractName } = daoConfig;

export const onConnectWallet = thunk(async (actions, _, helpers) => {
  global.Buffer = Buffer;
  const store = helpers.getStoreState();
  const wallet = store.entities.wallet;
  const redirectAction = redirectPages.welcome;

  actions.setTemporaryData({ redirectAction });

  wallet.requestSignIn({
      contractId: contractName,
      successUrl: getRoute.callbackUrl({ redirectAction }),
      failureUrl: getRoute.callbackUrl({ redirectAction, errorCode: 'userReject' }),
    },
    'Marketing Activation Form'
  );
});
