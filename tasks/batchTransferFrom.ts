import * as args from "../BatchTransferFrom.json";
import { task } from "hardhat/config";
import { ethers } from "hardhat";
import fs from "fs";

task("batchTransferFrom", "Makes a batchTransferFrom() function call.")
.setAction(async() => {
    const provider = ethers.provider;
    const network = await provider.getNetwork();
    const [ deployer ] = await ethers.getSigners();

    const networkFile = `../deployData-${network.name}.json`;

    const backupJSON = await fs.readFileSync(networkFile, "utf-8");
    const backup = JSON.parse(backupJSON);

    if (!backup.address) {
        console.log(`${networkFile} IS NOT FILLED PROPERLY\n
            Make sure you have deployed your contract or fill the backup file...`)
        return
    }

    const Contract = await ethers.getContractFactory("BatchTransferFrom");
    const contract = new ethers.Contract(`${backup.address}`, Contract.interface, deployer);

    const tx = await contract.batchTransferFrom(args.contracts, args.from, args.to)

    await tx.wait()

    console.log(tx)
    console.log(`network: ${network.name}\ndeplyer: ${deployer.address}\ndeployed to: ${contract.address}`)

    



});