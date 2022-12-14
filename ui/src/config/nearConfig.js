import { keyStores } from "near-api-js";

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const testnet = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  isTestnet: true,
};

const mainnet = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  isTestnet: false,
};

const configs = {
  testnet,
  mainnet,
};

const getNearConfig = (network) => {
  const config = configs[network];
  return {
    ...config,
  };
};

export const nearConfig = getNearConfig(process.env.REACT_APP_NETWORK);

export const daoConfig = {
  contractName: process.env.REACT_APP_CONTRACT_NAME,
  proposalDescriptionPrefix: process.env.REACT_APP_PROPOSAL_DESCRIPTION_PREFIX,
};
