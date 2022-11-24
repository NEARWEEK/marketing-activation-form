import { Buffer } from 'buffer';

import { nearConfig } from '../config/nearConfig';

const { networkId } = nearConfig;

const signStringMessage = async (near, wallet, stringMessage) => {
  const signer = near?.connection.signer;
  const accountId = wallet?.isSignedIn() && wallet.getAccountId();

  if (signer && accountId) {
    const byteMessage = Buffer.from(stringMessage);
    const signature = await signer.signMessage(byteMessage, accountId, networkId);
    return signature ?
      {
        signature: signature.signature,
        accountId
      } :
      null;
  } else {
    return null;
  }
};

export {
  signStringMessage,
};
