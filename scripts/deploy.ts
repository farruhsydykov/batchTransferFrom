import { ethers } from "hardhat";
import hre from "hardhat";
import fs from "fs";

async function main() {
  const provider = hre.ethers.provider;
  const network = await provider.getNetwork();
  const [ deployer ] = await hre.ethers.getSigners();

  const nonce = await deployer.getTransactionCount();
  const networkFile = `./deployData-${network.name}.json`;
  
  const deployDataString = await fs.readFileSync(networkFile, "utf-8");
  const deployData = JSON.parse(deployDataString);

  console.log(deployData)

  const Contract = await ethers.getContractFactory("BatchTransferFrom");
  const contract = await Contract.deploy({nonce: nonce});

  await contract.deployed();

  console.log(`network: ${network.name}\ndeplyer: ${deployer.address}\ndeployed to: ${contract.address}`);
  
  deployData.deployer = deployer.address
  deployData.address = contract.address

  await fs.writeFileSync(networkFile, JSON.stringify(deployData))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});