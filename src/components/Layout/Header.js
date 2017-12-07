import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccount } from "app/actions/account";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="nav-desktop">
          <div className="logo">
            <span>Blockmo</span>
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
              <span className="amount">{this.props.account.balance} ETH</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(({ account }) => ({ account }), { getAccount })(Header);
