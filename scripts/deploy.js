async function main() {
  const contract = await ethers.getContractFactory("ExpiringDictionary");
  console.log("Deploying contract...");
  const c = await contract.deploy();
  await c.deployed();
  console.log("Contract deployed to: ", c.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
