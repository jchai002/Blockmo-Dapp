import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

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
  render() {
    if (!this.props.web3) {
      return (
        <div>
          <p>{"No Web3 detected"}</p>
        </div>
      );
    } else if (!this.state.account) {
      return (
        <div>
          <p>{"Please login with metamask"}</p>
        </div>
      );
    } else {
      return <div className="App">{this.props.children}</div>;
    }
  }
}

function mapStateToProps({ web3 }) {
  return { web3: web3.web3Instance };
}

export default connect(mapStateToProps)(App);
