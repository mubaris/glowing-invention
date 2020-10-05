require('dotenv').config();
const Web3 = require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const accountAbi = [{"stateMutability": "payable","type": "receive","payable": true},{"inputs": [{"internalType": "address[]","name": "_targets","type": "address[]"},{"internalType": "bytes[]","name": "_datas","type": "bytes[]"}],"name": "cast","outputs": [],"stateMutability": "payable","type": "function","payable": true}];
const accountAddr = "0x74007ce78016701A7c4fC274f703563BEf4451E7";

const uniswapConnector = "0x6dDcfd7D8b0bd010d80b06b5f2c44C9A4c2cF6d3";

const provider = new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA}`);

let web3 = new Web3(provider);

const contract = new web3.eth.Contract(accountAbi, accountAddr);

const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const weth = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
const dai = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";
const mkr = "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85";
const usdt = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";

const sellV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"expectedBuyAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"}],"name":"sellViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};
const buyV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"uint256","name":"expectedSellAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"}],"name":"buyViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};

const sellPath = [weth, usdt];
const buyPath = [weth, dai, mkr];

const targets = [
    uniswapConnector,
    // uniswapConnector
];

const datas = [
    web3.eth.abi.encodeFunctionCall(sellV, [usdt, eth, 1235450, 363708, sellPath]),
    // web3.eth.abi.encodeFunctionCall(buyV, [mkr, eth, 1235450, 6231354, buyPath])
]; // buyAddr, sellAddr, sellAmt/buyAmt, expected, paths[]

console.log(targets);
console.log(datas);

const caller = async (contract, targets, datas) => {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];
    await contract.methods.cast(targets, datas).send({value: 1235450, from: fromAddress});
}

caller(contract, targets, datas);
