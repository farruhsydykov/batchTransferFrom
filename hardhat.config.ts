import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_GOERLI}`,
      chainId: 5,
      accounts: {
        count: 5,
        mnemonic: `${process.env.MNEMONIC}`
      }
    },

    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_MAINNET}`,
      chainId: 1,
      accounts: {
        count: 1,
        mnemonic: `${process.env.MNEMONIC}`
      }
    },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_ETH}`
  }
};

export default config;
