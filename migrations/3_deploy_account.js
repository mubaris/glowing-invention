let account = artifacts.require("InstaAccount")
let memory = artifacts.require("InstaMemory")
let event = artifacts.require("InstaEvent")

module.exports = (deployer) => {
    deployer.deploy(account);
    deployer.deploy(memory);
    deployer.deploy(event);
};