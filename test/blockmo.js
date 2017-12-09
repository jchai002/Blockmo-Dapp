// Contract to be tested
var Blockmo = artifacts.require("./Blockmo.sol");

// Test suite
contract("Blockmo", function(accounts) {
  var blockmo;
  var sender = accounts[1];
  var receiver = accounts[2];
  var transactionAmount = 5;
  var transactionNote = "testing 123";
  var senderBalanceBeforeTransaction, senderBalanceAfterTransaction;
  var receiverBalanceBeforeTransaction, receiverBalanceAfterTransaction;
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

  // Test case: the first transaction
  it("should send one transaction correctly", function() {
    return Blockmo.deployed()
      .then(function(instance) {
        blockmo = instance;
        transactionId = 1;

        // record balances of sender and receiver before the payment
        senderBalanceBeforeTransaction = web3
          .fromWei(web3.eth.getBalance(sender), "ether")
          .toNumber();
        receiverBalanceBeforeTransaction = web3
          .fromWei(web3.eth.getBalance(receiver), "ether")
          .toNumber();

        return blockmo.pay(receiver, transactionNote, {
          from: sender,
          value: web3.toWei(transactionAmount, "ether")
        });
      })
      .then(function(receipt) {
        assert.equal(
          receipt.logs.length,
          1,
          "one event should have been triggered"
        );
        assert.equal(
          receipt.logs[0].event,
          "transactionEvent",
          "event should be transactionEvent"
        );
        assert.equal(
          receipt.logs[0].args._id.toNumber(),
          transactionId,
          "transactionId must be " + transactionId
        );
        assert.equal(
          receipt.logs[0].args._sender,
          sender,
          "event sender must be " + sender
        );
        assert.equal(
          receipt.logs[0].args._receiver,
          receiver,
          "event receiver must be " + receiver
        );
        assert.equal(
          receipt.logs[0].args._note,
          transactionNote,
          "event note must be " + transactionNote
        );
        assert.equal(
          receipt.logs[0].args._amount.toNumber(),
          web3.toWei(transactionAmount, "ether"),
          "event amount must be " + web3.toWei(transactionAmount, "ether")
        );

        // record balances of receiver and sender after the payment
        senderBalanceAfterTransaction = web3
          .fromWei(web3.eth.getBalance(sender), "ether")
          .toNumber();
        receiverBalanceAfterTransaction = web3
          .fromWei(web3.eth.getBalance(receiver), "ether")
          .toNumber();

        //check the effect of payment on balances of receiver and sender, accounting for gas
        assert(
          senderBalanceAfterTransaction <=
            senderBalanceBeforeTransaction - transactionAmount,
          "sender should have spent " + transactionAmount + " ETH"
        );
        assert(
          receiverBalanceAfterTransaction ==
            receiverBalanceBeforeTransaction + transactionAmount,
          "receiver should have gotten " + transactionAmount + " ETH"
        );

        return blockmo.transactions(transactionId);
      })
      .then(function(data) {
        assert.equal(data[0].toNumber(), 1, "transaction id must be 1");
      });
  });

  // Test case: following transactions
  it("should send another transaction correctly", function() {
    return Blockmo.deployed()
      .then(function(instance) {
        blockmo = instance;
        transactionId = 2;

        // record balances of sender and receiver before the payment
        senderBalanceBeforeTransaction = web3
          .fromWei(web3.eth.getBalance(sender), "ether")
          .toNumber();
        receiverBalanceBeforeTransaction = web3
          .fromWei(web3.eth.getBalance(receiver), "ether")
          .toNumber();

        return blockmo.pay(receiver, transactionNote, {
          from: sender,
          value: web3.toWei(transactionAmount, "ether")
        });
      })
      .then(function(receipt) {
        assert.equal(
          receipt.logs.length,
          1,
          "one event should have been triggered"
        );
        assert.equal(
          receipt.logs[0].event,
          "transactionEvent",
          "event should be transactionEvent"
        );
        assert.equal(
          receipt.logs[0].args._id.toNumber(),
          transactionId,
          "transactionId must be " + transactionId
        );
        assert.equal(
          receipt.logs[0].args._sender,
          sender,
          "event sender must be " + sender
        );
        assert.equal(
          receipt.logs[0].args._receiver,
          receiver,
          "event receiver must be " + receiver
        );
        assert.equal(
          receipt.logs[0].args._note,
          transactionNote,
          "event note must be " + transactionNote
        );
        assert.equal(
          receipt.logs[0].args._amount.toNumber(),
          web3.toWei(transactionAmount, "ether"),
          "event amount must be " + web3.toWei(transactionAmount, "ether")
        );

        // record balances of receiver and sender after the payment
        senderBalanceAfterTransaction = web3
          .fromWei(web3.eth.getBalance(sender), "ether")
          .toNumber();
        receiverBalanceAfterTransaction = web3
          .fromWei(web3.eth.getBalance(receiver), "ether")
          .toNumber();

        //check the effect of payment on balances of receiver and sender, accounting for gas
        assert(
          senderBalanceAfterTransaction <=
            senderBalanceBeforeTransaction - transactionAmount,
          "sender should have spent " + transactionAmount + " ETH"
        );
        assert(
          receiverBalanceAfterTransaction ==
            receiverBalanceBeforeTransaction + transactionAmount,
          "receiver should have gotten " + transactionAmount + " ETH"
        );

        return blockmo.transactions(transactionId);
      })
      .then(function(data) {
        assert.equal(data[0].toNumber(), 2, "transaction id must be 2");
      });
  });
});
