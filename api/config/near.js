const testnet = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const mainnet = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.near.org",
};

const configs = {
  testnet,
  mainnet,
};

const getNearConfig = () => {
  const network = process.env.NEAR_NETWORK_ENV || 'testnet';
  const config = configs[network];
  return {
    ...config,
  };
};

const daoConfig = {
  contractName: process.env.NEAR_DAO_CONTRACT_ID,
};

module.exports = {
  getNearConfig,
  daoConfig,
};
