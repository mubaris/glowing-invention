let Uni = artifacts.require("InstaUniswapV2Resolver")

module.exports = (deployer) => {
    deployer.deploy(Uni);
};