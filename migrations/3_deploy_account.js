let account = artifacts.require("InstaAccount")

module.exports = (deployer) => {
    deployer.deploy(account);
};