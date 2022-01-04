/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers');

try {
  const { alchemyApiKey, mnemonic } = require('./secrets.json');
  
  module.exports = {
    solidity: "0.7.3",
    networks: {
      rinkeby: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
        accounts: {mnemonic: mnemonic}
      }
    }
  };
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
  module.exports = {
    solidity: "0.7.3",
  };
}
