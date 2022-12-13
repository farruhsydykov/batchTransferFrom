import { ethers } from "hardhat";
require("dotenv").config();
import hre from "hardhat";
import fs from "fs";

async function main() {
  const provider = hre.ethers.provider;
  const network = await provider.getNetwork();
  const deployer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

  const nonce = await deployer.getTransactionCount();
  const networkFile = `./deployData-${network.name}.json`;

  const deployDataString = await fs.readFileSync(networkFile, "utf-8");
  const deployData = JSON.parse(deployDataString);

  const Contract = await ethers.getContractFactory("BatchTransferFrom");
  const contract = await Contract.deploy({nonce: nonce});

  await contract.deployed();

  console.log(`network: ${network.name}\ndeployer: ${deployer.address}\ndeployed to: ${contract.address}`);
  
  deployData.address = contract.address

  await fs.writeFileSync(networkFile, JSON.stringify(deployData))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});