import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
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
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Home</h1>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps({ web3 }) {
  return { web3: web3.web3Instance };
}

export default connect(mapStateToProps)(Home);
