import React, { Component } from "react";
import { connect } from "react-redux";
const moment = require("moment");

@connect(({ transactions }) => ({ transactions }), null)
export default class TransactionList extends Component {
  renderTransactions() {
    return this.props.transactions.map((tx, i) => {
      let date = new Date(tx[5] * 1000);
      return (
        <li key={i}>
          <p>
            <span>
              {`${tx[1].substr(-6)} paid ${tx[2].substr(-6)}`}{" "}
              <b className="amount">{`${tx[3]} ETH`}</b>
            </span>
            <span className="timestamp">{moment(date).fromNow()}</span>
          </p>
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
