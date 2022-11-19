import { Buffer } from 'buffer';

import { useStoreState } from "easy-peasy";
import { useEffect, useState } from 'react';

const networkId = process.env.REACT_APP_NETWORK;

const useAccountSignature = () => {
  const [accountSignature, setAccountSignature] = useState(null);
  const { near, wallet } = useStoreState((state) => state.entities);

  const signer = near?.connection.signer;
  const accountId = wallet?.isSignedIn() && wallet.getAccountId()

  const signStringMessage = async (stringMessage) => {
    if (signer) {
      const byteMessage = Buffer.from(stringMessage);
      const signature = await signer.signMessage(byteMessage, accountId, networkId);
      return signature?.signature;
    } else {
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      if (accountId) {
        const signature = await signStringMessage(accountId);
        const fullSignature = {
          signature,
          accountId,
        };
        setAccountSignature(fullSignature);
      }
    })();
  }, [signer, accountId]);

  return accountSignature;
};

export default useAccountSignature;
