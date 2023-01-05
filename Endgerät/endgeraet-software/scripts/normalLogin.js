const oracleContract = "0xbb3EEb33181Ac7a6265E230eA2aB3a0b2263127c";
const ersterContract = "0xD5Ae1E33e2E9D14a92f43a31fab7faB913dB3CfF";
const nochEiner = "0x3c8Bf8E4a20bA0D13D80776414906caB7d053650";
const joby = "4bcf97be-b3b3-4400-acd9-5b2772f8fdd5";
const theJob = "79b6de3c-8daf-4029-8550-2eb7bbc78e80";

const {ethers} = require("hardhat");
const contract = require("../artifacts/contracts/ClientContract.sol/ClientContract.json");


const alchemyNode = new ethers.providers.AlchemyProvider(network="goerli", process.env.API_KEY);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyNode);

const clientContract = new ethers.Contract(process.env.CLIENTCONTRACT_ADDRESS, contract.abi, wallet);

async function main() {
    const tx = await clientContract.loginUser(nochEiner, theJob, "test", "testtest", "CryptoUniversity");
    console.log("The message: ", tx);
    console.log("We are waiting..");
    await tx.wait();
    const lastLoginInfo = await clientContract.lastLoginInfo();
    console.log("last Login Info: ", lastLoginInfo);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });