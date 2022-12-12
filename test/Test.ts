import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TransferFrom", function () {
  
  async function TransferFromFixture() {
    const [deployer, adr1, adr2, adr3, adr4, adr5, adr6, adr7, adr8] = await ethers.getSigners();

    // console.log(deployer, adr1, adr2, adr3, adr4, adr5, adr6, adr7, adr8)

    const Token = await ethers.getContractFactory("TestToken");
    const token1 = await Token.deploy("_token1", "tk1")
    const token2 = await Token.deploy("_token2", "tk2")
    const token3 = await Token.deploy("_token3", "tk3")

    const TF = await ethers.getContractFactory("BatchTransferFrom");
    const tf = await TF.deploy();

    return { tf, deployer, token1, token2, token3, adr1, adr2, adr3, adr4, adr5, adr6, adr7, adr8};
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { tf, deployer } = await loadFixture(TransferFromFixture);

      expect(await tf.owner()).to.equal(deployer.address);
    });

    it("Should call transferFrom seven times", async function () {
      const { tf, token1, token2, token3, adr1, adr2, adr3, adr4, adr5, adr6, adr7, adr8 } = await loadFixture(TransferFromFixture);

      let tokenAdrArr = [token1.address, token2.address, token3.address, token1.address, token2.address, token3.address, token1.address]
      let fromAdrArr = [adr1.address, adr2.address, adr3.address, adr4.address, adr5.address, adr6.address, adr7.address ]
      let toAdrArr = [adr2.address, adr3.address, adr4.address, adr5.address, adr6.address, adr7.address, adr8.address]

      // const estimation = await tf.estimateGas.batchTransferFrom(tokenAdrArr, fromAdrArr, toAdrArr)
      // console.log(estimation)

      await expect(tf.batchTransferFrom(tokenAdrArr, fromAdrArr, toAdrArr))
      // .to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)
      // .and.to.emit(tf, "SuccessfulTransfer")
      // // .withArgs(anyValue, anyValue, anyValue)

    });
  });    
});
