import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Header from "./components/Layout/Header";

class App extends Component {
  state = {
    account: null
  };
  componentDidUpdate() {
    if (this.props.web3) {
      this.props.web3.eth.getCoinbase((err, account) => {
        if (account) {
          this.setState({ account });
        }
        if (err) {
          console.error(err);
        }
      });
    }
  }

  renderView() {
    if (!this.props.web3) {
      return (
        <div className="unauthenticated">
          <p>{"No Web3 detected please download metamask"}</p>
        </div>
      );
    } else if (!this.state.account) {
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

function mapStateToProps({ web3 }) {
  return { web3: web3.web3Instance };
}

export default connect(mapStateToProps)(App);
