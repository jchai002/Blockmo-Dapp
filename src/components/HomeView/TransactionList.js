import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionList extends Component {
  renderTransactions() {
    return this.props.transactions.map((tx, i) => {
      return (
        <li key={i}>
          <p>{`${tx[1].substr(-6)} paid ${tx[2].substr(-6)} ${tx[3]} ETH`}</p>
          <p>{`${tx[4]}`}</p>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <ul className="transaction-list">{this.renderTransactions()}</ul>
      </div>
    );
  }
}
export default connect(({ transactions }) => ({ transactions }), null)(
  TransactionList
);
