const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Counter = await hre.ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();
  await counter.deployed();
  console.log('Counter contract deployed to: ', counter.address);

  let config = `export const counteraddress = "${counter.address}"`;

  let data = JSON.stringify(config);
  fs.writeFileSync('config.js', JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
