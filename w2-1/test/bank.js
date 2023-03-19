const { expect } = require("chai");
const { ethers } = require("hardhat/internal/lib/hardhat-lib");

let bank; //let声明变量
let account1;
let account2;

describe("Bank", function () { //describe测试套件
  async function init() {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
    await bank.deployed();
    console.log("bank:" + bank.address);
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
    account1 = otherAccount;
    account2 = otherAccount2;
  }

  before(async function () {// mocha测试框架下的钩子函数
    await init();
  })

  // it 测试用例
  // expect测试是否返回期望结果
  it("translation", async function () {
    // await expect(promise).to.changeEtherBalances([address],[values]) 方法
    await expect(account1.sendTransaction({
      to: bank.address,
      value: ethers.utils.parseEther("1")
    })).to.changeEtherBalances([account1.address, bank.address], [ethers.utils.parseEther("-1"), ethers.utils.parseEther("1")])
  })

  it("withdrawFail", async function () {
    let withdraw = bank.connect(account1).withdraw(ethers.utils.parseEther("2"))
    // await expect(promise).eventually.to.rejectedWith()方法
    await expect(withdraw).eventually.to.rejectedWith(Error)
  })

  it("withdrawSuccess", async function () {
    let tx = await bank.connect(account1).withdraw(ethers.utils.parseEther("1"))
    await tx.wait();

    // await expect(promise).to.equal()方法
    await expect(await bank.deposits(account1.address)).to.equal(0)
  })

})
