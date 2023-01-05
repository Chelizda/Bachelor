const { ethers } = require("hardhat");

async function main() {
    const ModeratorContract = await ethers.getContractFactory("ModeratorContract");

    const Moderator_Contract = ModeratorContract.deploy();
    console.log("Contract aufgesetzt: ", (await Moderator_Contract).address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

    // 0xec52767E07B3B3b2e3c535aca1ca6151af50f253 -0xA20e076d7575c74105971ec3f25541E5f2C0Fc7C