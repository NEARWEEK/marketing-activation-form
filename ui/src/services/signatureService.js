import { Buffer } from 'buffer';

const networkId = process.env.REACT_APP_NETWORK;

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
