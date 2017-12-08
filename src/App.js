import React, { Component } from "react";
import { connect } from "react-redux";
import "app/assets/styles/app.scss";
import { initializeWeb3 } from "app/actions/web3";
import { getAccount } from "app/actions/account";
import Header from "app/components/Layout/Header";
import { pollForAccountChange } from "app/util/listeners";

class App extends Component {
  componentDidMount() {
    this.props.initializeWeb3();
  }

  componentWillReceiveProps(nextProps) {
    // only get account if not logged in
    if (!nextProps.account.address && nextProps.web3) {
      this.props.getAccount(nextProps.web3);
    }
    if (nextProps.account.address) {
      // attach a listener here to check for metamask account change
      return pollForAccountChange();
    }
  }

  renderView() {
    if (!this.props.web3) {
      return (
        <div className="unauthenticated">
          <p>
            This Dapp requires the{" "}
            <a className="external-link" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            Chrome extension. You can{" "}
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              className="external-link"
            >
              download it here
            </a>.
          </p>
        </div>
      );
    } else if (!this.props.account.address) {
      return (
        <div className="unauthenticated">
          <p>
            Please login with{" "}
            <a className="external-link" href="https://metamask.io/">
              MetaMask
            </a>
          </p>
        </div>
      );
    } else {
      return <div className="authenticated">{this.props.children}</div>;
    }
  }
  render() {
    return (
      <div className="app">
        <Header />
        <main className="container">{this.renderView()}</main>
      </div>
    );
  }
}
export default connect(
  ({ web3, account }) => ({
    web3,
    account
  }),
  {
    initializeWeb3,
    getAccount
  }
)(App);
