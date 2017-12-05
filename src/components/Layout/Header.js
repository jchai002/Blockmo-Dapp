import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  // componentDidUpdate() {
  //   if (this.props.web3) {
  //     this.props.web3.eth.getCoinbase((err, account) => {
  //       console.log(account);
  //       if (!err) {
  //         this.props.web3.eth.getBalance(account, (err, balance) => {
  //           if (!err) {
  //             console.log(this.props.web3.fromWei(balance, "ether") + " ETH");
  //           }
  //         });
  //       } else {
  //         console.error(err);
  //       }
  //     });
  //   }
  // }
  render() {
    return (
      <header className="navbar">
        <div className="pure-g">
          <p>Blockmo</p>
        </div>
      </header>
    );
  }
}

function mapStateToProps({ web3 }) {
  return { web3: web3.web3Instance };
}

export default connect(mapStateToProps)(Header);
