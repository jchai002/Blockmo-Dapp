import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccount } from "actions/account";

class Header extends Component {
  state = {
    account: null,
    balance: null
  };
  // componentDidMount() {
  //   if (this.props.web3) {
  //     // get account
  //     this.props.web3.eth.getCoinbase((err, account) => {
  //       this.setState({ account });
  //       if (account) {
  //         // get balance
  //         this.props.web3.eth.getBalance(account, (err, wei) => {
  //           if (wei) {
  //             var balance = this.props.web3.fromWei(wei, "ether") + " ETH";
  //             this.setState({ balance });
  //           }
  //         });
  //       }
  //     });
  //   }
  // }
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
              <span>{this.state.account}</span>
            </p>
          </div>
          <div className="balance">
            <p>
              <span>Balance:</span>
              <span>{this.state.balance}</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(null, { getAccount })(Header);
