import * as args from "../BatchTransferFrom.json";
import { ethers } from "hardhat";
import fs from "fs";

async function main() {
    const provider = ethers.provider;
    const network = await provider.getNetwork();
    const [ deployer ] = await ethers.getSigners();

    const nonce = await deployer.getTransactionCount();

    const networkFile = `./deployData-${network.name}.json`;

    const backupJSON = await fs.readFileSync(networkFile, "utf-8");
    const backup = JSON.parse(backupJSON);

    console.log(backup)

    if (!backup.address) {
        console.log(`${networkFile} IS NOT FILLED PROPERLY\n
            Make sure you have deployed your contract or fill the backup file...`)
        return
    }

    console.log("here?")

    const Contract = await ethers.getContractFactory("BatchTransferFrom");
    const contract = new ethers.Contract(`${backup.address}`, Contract.interface, deployer);
    
    const tx = await contract.batchTransferFrom(args.contracts, args.from, args.to, {nonce})    
    await tx.wait()

    console.log(`network: ${network.name}\ndeplyer: ${deployer.address}\ndeployed to: ${contract.address}`)

}

main()