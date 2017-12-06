import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionList extends Component {
  renderTransactions() {
    return this.props.list.transactions.map((tx, i) => {
      return (
        <li key={i}>
          <p>{tx.amount}</p>
          <p>{tx.sender}</p>
          <p>{tx.receiver}</p>
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="col-xs-12 col-md-8 col-md-offset-2">
        {this.renderTransactions()}
      </ul>
    );
  }
}
export default connect(({ list }) => ({ list }), null)(TransactionList);
