import React, { Component } from "react";
import { connect } from "react-redux";

class TransactionList extends Component {
  renderTransactions() {
    return this.props.list.transactions.map((tx, i) => {
      console.log(tx);
      return (
        <li key={i}>
          <p>{`${tx[1]} transferred`}</p>
          <p>{`${tx[3]} ETH`}</p>
          <p>{`to ${tx[2]}`}</p>
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
export default connect(({ list }) => ({ list }), null)(TransactionList);
