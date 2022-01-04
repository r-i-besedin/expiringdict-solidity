# Expiring Dict Solidity
Basic implementation of dictionary with auto-expiring values
# How to use this repo
Tested with node: v12.22.5, npm: 7.5.2<br>
Project uses Ethereum development environment - [Hard Hat](https://hardhat.org/)<br>
Install dependencies:

```bash
npm install
```

Start a local node:

```bash
npx hardhat node
```

Compile and deploy contract:

```bash
npx hardhat compile
npx hardhat run --network localhost scripts/deploy.js
#or to deploy on Rinkeby testnet
#npx hardhat run --network rinkeby scripts/deploy.js
```
Note: to deploy smart contract on Rinkeby you should create a secrets.json file:
```json
{
  "mnemonic": "your 12 word mnemonic phrase",
  "alchemyApiKey": "your alchemy key"
}
```

To interact with deployed contract you could use
Hard Hat console:

```bash
npx hardhat console --network localhost
>const ExpDict = await ethers.getContractFactory("ExpiringDictionary");
>const expDict = await ExpDict.attach("deployed contract address");
>await expDict.put("foo", "bar", 0);
```

To run tests:

```bash
npx hardhat test
```
