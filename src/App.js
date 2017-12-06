import React, { Component } from "react";
import { connect } from "react-redux";
import "./assets/styles/app.scss";
import { initializeWeb3 } from "actions/web3";
import { getAccount } from "actions/account";
import Header from "./components/Layout/Header";

class App extends Component {
  componentDidMount() {
    this.props.initializeWeb3();
    this.props.getAccount();
  }

  renderView() {
    if (!this.props.web3) {
      return (
        <div className="unauthenticated">
          <p>{"No Web3 detected please download metamask"}</p>
        </div>
      );
    } else if (!this.props.account.address) {
      return (
        <div className="unauthenticated">
          <p>{"Please login with metamask"}</p>
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
        {this.renderView()}
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
