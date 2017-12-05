import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccount } from "actions/account";

class Header extends Component {
  componentDidMount() {
    this.props.getAccount();
  }
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
              <span>{this.props.account.address}</span>
            </p>
          </div>
          <div className="balance">
            <p>
              <span>Balance:</span>
              <span>{this.props.account.balance}</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(({ account }) => ({ account }), { getAccount })(Header);
