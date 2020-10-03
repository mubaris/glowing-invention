require('dotenv').config()
const ethers = require("ethers");

const abi = [{"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"slippage","type":"uint256"}],"name":"getBuyAmount","outputs":[{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amtA","type":"uint256"}],"name":"getDepositAmount","outputs":[{"internalType":"uint256","name":"amtB","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amtA","type":"uint256"},{"internalType":"uint256","name":"amtB","type":"uint256"}],"name":"getDepositAmountNewPool","outputs":[{"internalType":"uint256","name":"unitAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256","name":"buyAmt","type":"uint256"}],"name":"getOptimalBuyPath","outputs":[{"internalType":"address[]","name":"paths","type":"address[]"},{"internalType":"uint256","name":"sellAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256","name":"sellAmt","type":"uint256"}],"name":"getOptimalSellPath","outputs":[{"internalType":"address[]","name":"paths","type":"address[]"},{"internalType":"uint256","name":"buyAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"internalType":"struct Resolver.TokenPair[]","name":"tokenPairs","type":"tuple[]"}],"name":"getPosition","outputs":[{"components":[{"internalType":"uint256","name":"tokenAShareAmt","type":"uint256"},{"internalType":"uint256","name":"tokenBShareAmt","type":"uint256"},{"internalType":"uint256","name":"uniAmt","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"internalType":"struct Resolver.PoolData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"buyAmt","type":"uint256"},{"internalType":"uint256","name":"slippage","type":"uint256"}],"name":"getSellAmount","outputs":[{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"uniAmt","type":"uint256"},{"internalType":"uint256","name":"slippage","type":"uint256"}],"name":"getWithdrawAmounts","outputs":[{"internalType":"uint256","name":"amtA","type":"uint256"},{"internalType":"uint256","name":"amtB","type":"uint256"},{"internalType":"uint256","name":"unitAmtA","type":"uint256"},{"internalType":"uint256","name":"unitAmtB","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const addr = "0xd04402BDD35Ab4a7BDb5f213eA619F787F7A696a";;

const network = "rinkeby";

const provider = new ethers.providers.InfuraProvider(network, process.env.INFURA);

const contract = new ethers.Contract(addr, abi, provider);

const weth = "0xc778417e063141139fce010982780140aa0cd5ab";
const dai = "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735";
const mkr = "0xf9ba5210f91d0474bd1e1dcdaec4c58e359aad85";
const usdc = "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b";
const usdt = "0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02";
const wbtc = "0x577d296678535e4903d59a4c929b718e1d575e0a";
const zrx = "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6";

const tokens = [
    weth,
    dai,
    usdc,
    usdt
];

const printer = function(result) {
    const path = [];
    const buyAmt = result.buyAmt;
    const sellAmt = result.sellAmt;

    for (let [index, token] of result.paths.entries()) {
        token = token.toLowerCase();
        switch (token) {
            case weth:
                path.push("weth");
                break;
            case dai:
                path.push("dai");
                break;
            case usdc:
                path.push("usdc");
                break;
            case usdt:
                path.push("usdt");
                break;
            case mkr:
                path.push("mkr");
                break;
            case wbtc:
                path.push("wbtc");
                break;
            case zrx:
                path.push("zrx");
                break;
            default:
                break;
        }
    }



    if (buyAmt) {
        console.log(path, buyAmt.toString());
    } else {
        console.log(path, sellAmt.toString());
    }
}

const runner = async function() {
    let result = await contract.getOptimalSellPath(usdc, mkr, tokens, 12456345);

    printer(result);

    result = await contract.getOptimalBuyPath(usdt, usdc, tokens, 98654);

    printer(result);

    result = await contract.getOptimalBuyPath(mkr, usdt, tokens, 12344578623);

    printer(result);

    result = await contract.getOptimalSellPath(dai, mkr, tokens, 12456345);

    printer(result);

    result = await contract.getOptimalBuyPath(wbtc, usdt, tokens, 123457);

    printer(result);

    result = await contract.getOptimalSellPath(dai, wbtc, tokens, 12795456);

    printer(result);

    result = await contract.getOptimalBuyPath(zrx, usdt, tokens, 1234554345);

    printer(result);

    result = await contract.getOptimalSellPath(mkr, zrx, tokens, 127955645);

    printer(result);
}

runner()