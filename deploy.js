const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  ); // Ganache Blockchain

  const wallet = new ethers.Wallet(
    "ee001c0589b71448cf3c61a8a596ee422773ca9e6eb06fb98340d758d7d0378e",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying Contract, please wait.....");
  const contract = await contractFactory.deploy();
  console.log(contract);
  console.log(`Contract deployed at address ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
