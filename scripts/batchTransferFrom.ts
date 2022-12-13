import * as args from "../BatchTransferFrom.json";
import { ethers } from "hardhat";
require("dotenv").config();
import fs from "fs";

async function main() {
    const provider = ethers.provider;
    const network = await provider.getNetwork();
    const deployer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

    const nonce = await deployer.getTransactionCount();

    const networkFile = `./deployData-${network.name}.json`;

    const backupJSON = await fs.readFileSync(networkFile, "utf-8");
    const backup = JSON.parse(backupJSON);

    if (!backup.address) {
        console.log(
            `Make sure you have provided batchTransferFrom contract address to "deployData-${network.name}.json"`
        )
        return
    }

    const Contract = await ethers.getContractFactory("BatchTransferFrom");
    const contract = new ethers.Contract(`${backup.address}`, Contract.interface, deployer);

    let success;

    try {
        const tx = await contract.batchTransferFrom(args.contracts, args.from, args.to, {nonce: nonce})
        await tx.wait()
        success = true
    } catch (error) {
        success = false
        console.error(`Контракт отменил транзакцию, возможно один из переданных адресов токенов не подходит для перевода 0 токенов`)
    }

    if (success) console.log(`Call success`)

}

main()

// "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
// "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
// "0xb809b9B2dc5e93CB863176Ea2D565425B03c0540",
// "0xb809b9B2dc5e93CB863176Ea2D565425B03c0540"