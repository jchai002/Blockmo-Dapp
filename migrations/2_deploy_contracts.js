var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var SendToken = artifacts.require("./SendToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, SendToken);
  deployer.deploy(SendToken);
};
