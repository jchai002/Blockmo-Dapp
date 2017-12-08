import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccount } from "app/actions/account";

@connect(({ account }) => ({ account }), { getAccount })
export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="nav-desktop">
          <div className="logo">
            <h1>Blockmo</h1>
          </div>
          <div className="account">
            <p>
              <span>Address:</span>
              <span className="address">{this.props.account.address}</span>
            </p>
          </div>
          <div className="balance">
            <p>
              <span>Balance:</span>
              <span className="amount">
                {this.props.account.balance || 0} ETH
              </span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}
