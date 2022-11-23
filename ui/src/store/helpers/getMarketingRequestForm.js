import { getForm } from '../../services/apiService';
import { signStringMessage } from '../../services/signatureService';

export const getMarketingRequestForm = async (marketingFromId, state) => {
  const { near, wallet } = state.entities;
  const accountId = wallet?.isSignedIn() && wallet.getAccountId();

  if (accountId) {
    const signature = await signStringMessage(near, wallet, accountId);
    if (signature) {
      const form = await getForm(marketingFromId, signature);
      if (form) {
        return form;
      }
    }
  }

  throw new Error('Could not get marketing form');
};
