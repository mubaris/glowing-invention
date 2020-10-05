let uni = artifacts.require("ConnectUniswapV2")

module.exports = (deployer) => {
    deployer.deploy(uni);
};