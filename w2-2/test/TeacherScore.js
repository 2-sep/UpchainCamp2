const { expect } = require("chai");
const { ethers } = require("hardhat/internal/lib/hardhat-lib");

describe("ScoreTest", function () {
  let score, teacher;
  let student;

  async function init() {
    const Score = await ethers.getContractFactory("Score");
    score = await Score.deploy();
    await score.deployed();
    console.log("Score contract:" + score.address);

    const Teacher = await ethers.getContractFactory("Teacher");
    teacher = await Teacher.deploy(score.address);
    await teacher.deployed();
    console.log("Teacher contract:" + teacher.address);

  }

  before(async function () {
    await init();
  })

  it("set teacher", async function () {
    let tx = await score.setTeacher(teacher.address);
    await tx.wait()

    const teacherAddr = await score.teacher();
    await expect(teacherAddr).to.equal(teacher.address);
  });

  it("callSetScore", async function () {
    const addr = "0x1234567890123456789012345678901234567890";
    const data = 10;

    await teacher.callSetScore(addr, data);

    const studentscore = await score.students(addr);
    await expect(studentscore).to.equal(data);
  });
})