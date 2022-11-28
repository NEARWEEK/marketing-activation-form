const { InMemorySigner, keyStores } = require("near-api-js");
const nearApi = require('near-api-js');
const { getNearConfig } = require('../config/near');

const setUpNear = () => {
  const config = getNearConfig();
  const connection = nearApi.Connection.fromConfig(
    {
      ...config,
      provider: new nearApi.providers.JsonRpcProvider(
        {url: config.nodeUrl}
      ),
      signer: new InMemorySigner(new keyStores.InMemoryKeyStore()),
    }
  );
  const account = new nearApi.Account(connection, '');

  return { connection, account };
};

module.exports = setUpNear;
