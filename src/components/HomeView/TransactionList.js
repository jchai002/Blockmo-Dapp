import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionList extends Component {
  renderTransactions() {
    return this.props.transactions.map((tx, i) => {
      return (
        <li key={i}>
          <p>{`${tx[1].substr(-6)} transferred ${tx[3]} ETH to ${tx[2].substr(
            -6
          )}`}</p>
          <p>{`because ${tx[4]}`}</p>
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
export default connect(({ transactions }) => ({ transactions }), null)(
  TransactionList
);
