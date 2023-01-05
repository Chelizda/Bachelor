const oracleContract = "0xbb3EEb33181Ac7a6265E230eA2aB3a0b2263127c";
const ersterContract = "0xD5Ae1E33e2E9D14a92f43a31fab7faB913dB3CfF";
const joby = "5a71dcb7-d90b-4394-be12-113844dd82c9";

const {ethers} = require("hardhat");
const contract = require("../artifacts/contracts/ClientContract.sol/ClientContract.json");


const alchemyNode = new ethers.providers.AlchemyProvider(network="goerli", process.env.API_KEY);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyNode);

const moderatorContract = new ethers.Contract(process.env.MODERATORCONTRACT_ADDRESS, contract.abi, wallet);

async function main() {
    const tx = await moderatorContract.registerUser(ersterContract, joby, "NochEinTest", "Testerino");
    console.log("The message: ", tx);
    console.log("We are waiting..");
    await tx.wait();
    const lastRegisterInfo = await moderatorContract.CreateInfo();
    console.log("last Logout Info: ", lastRegisterInfo);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });