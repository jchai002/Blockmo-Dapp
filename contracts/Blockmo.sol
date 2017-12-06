pragma solidity ^0.4.11;

import './zeppelin/lifecycle/Killable.sol';

contract Blockmo is Killable {

  struct Transaction {
    uint id;
    address sender;
    address receiver;
    uint256 amount;
    string note;
  }

  struct Account {
    uint id;
    address account_address;
  }

  // State variables
  mapping(uint => Transaction) public transactions;
  uint transactionCounter;

  mapping(uint => Account) public accounts;
  uint accountCounter;

  // Events
  event payEvent (
    uint indexed _id,
    address indexed _sender,
    address indexed _receiver,
    uint256 _amount,
    string _note
  );

  function pay(address _receiver, string _note) payable public {
    // don't allow the sender to send to self
    require(_receiver != msg.sender);
    // add new transaction
    transactionCounter++;

    // store this transaction
    transactions[transactionCounter] = Transaction(
         transactionCounter,
         msg.sender,
         _receiver,
         msg.value,
         _note
    );

    // the receiver gets some token
    _receiver.transfer(msg.value);

    // trigger the event
    payEvent(transactionCounter, msg.sender, _receiver, msg.value, _note);
  }

  // fetch the number of transactions in the contract
  function getNumberOfTransactions() public constant returns (uint) {
    return transactionCounter;
  }

}
