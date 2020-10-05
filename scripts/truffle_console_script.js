const uniswapConnector = "0x6dDcfd7D8b0bd010d80b06b5f2c44C9A4c2cF6d3";

// const acc = artifacts.require("InstaAccount").deployed();
const acc = await InstaAccount.deployed();

const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const weth = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
const dai = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";
const mkr = "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85";
const usdt = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";

const sellV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"expectedBuyAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"}],"name":"sellViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};
const buyV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"uint256","name":"expectedSellAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"}],"name":"buyViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};

const sellPath = [weth, usdt];
const buyPath = [weth, dai, mkr];

let targets = [uniswapConnector,uniswapConnector];

let datas = [web3.eth.abi.encodeFunctionCall(sellV, [usdt, eth, 1235450, 363708, sellPath]),web3.eth.abi.encodeFunctionCall(buyV, [mkr, eth, 1235450, 64788730, buyPath])]; // buyAddr, sellAddr, sellAmt/buyAmt, expected, paths[]

acc.cast(targets, datas, {value: 66024180});
