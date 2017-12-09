// Contract to be tested
var Blockmo = artifacts.require("./Blockmo.sol");

// Test suite
contract("Blockmo", function(accounts) {
  // Test case: check initial values
  it("should be initialized with empty values", function() {
    return Blockmo.deployed()
      .then(function(instance) {
        blockmo = instance;
        return blockmo.getNumberOfTransactions();
      })
      .then(function(data) {
        assert.equal(data, 0x0, "number of transactions must be zero");
      });
  });
});
