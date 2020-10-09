const uniswapConnector = "0xc0454bf1c4d98664F96eed2fD6d587aDBFF42931";

// const acc = artifacts.require("InstaAccount").deployed();
const acc = await InstaAccount.deployed();

const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; const weth = "0xc778417E063141139Fce010982780140Aa0cD5Ab"; const dai = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735"; const mkr = "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85"; const usdt = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02"; const usdc = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";

const sellV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"sellViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};
const buyV = {"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"},{"internalType":"address[]","name":"paths","type":"address[]"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"buyViaPath","outputs":[],"stateMutability":"payable","type":"function","payable":true};

const sellPath = [weth, mkr, dai];
const buyPath = [weth, mkr];

let targets = [uniswapConnector,uniswapConnector];

let datas = [web3.eth.abi.encodeFunctionCall(sellV, [dai, eth, String(10**16), "201857397420247643151", sellPath, 0, 0]),web3.eth.abi.encodeFunctionCall(buyV, [mkr, eth, 123545, "10383064875146707678", buyPath, 0, 0])];

acc.cast(targets, datas, {value: String(10**17)});
