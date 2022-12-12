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

    if (!backup.address) {
        console.log(
            `${networkFile}\n
            IS NOT FILLED PROPERLY\n
            Make sure you have deployed your contract or fill the backup file...`
        )
        return
    }

    const Contract = await ethers.getContractFactory("BatchTransferFrom");
    const contract = new ethers.Contract(`${backup.address}`, Contract.interface, deployer);
    
    const tx = await contract.batchTransferFrom(args.contracts, args.from, args.to, {nonce})    
    await tx.wait()

    console.log(`Call success`)

}

main()