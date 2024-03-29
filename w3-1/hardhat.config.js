require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.API_KEY}`,
      chainId: 5,
      accounts: [process.env.privateKey],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ethscanApiKey
    }
  }
};