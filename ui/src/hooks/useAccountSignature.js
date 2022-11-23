import { useStoreState } from "easy-peasy";
import { useEffect, useState } from 'react';

import { signStringMessage } from '../services/signatureService';

const useAccountSignature = () => {
  const [accountSignature, setAccountSignature] = useState(null);
  const { near, wallet } = useStoreState((state) => state.entities);
  const accountId = wallet?.isSignedIn() && wallet.getAccountId()

  useEffect(() => {
    (async () => {
      if (accountId) {
        const signature = await signStringMessage(near, wallet, accountId);
        if (signature) {
          setAccountSignature(signature);
        }
      }
    })();
  }, [accountId]);

  return accountSignature;
};

export default useAccountSignature;
