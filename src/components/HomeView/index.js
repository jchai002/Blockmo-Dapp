import React, { Component } from "react";
import { connect } from "react-redux";
import SendForm from "./SendForm";

class Home extends Component {
  onInputChange(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    return (
      <main className="container">
        <div className="row">
          <SendForm />
        </div>
      </main>
    );
  }
}

function mapStateToProps({ web3 }) {
  return { web3: web3.web3Instance };
}

export default connect(mapStateToProps)(Home);
