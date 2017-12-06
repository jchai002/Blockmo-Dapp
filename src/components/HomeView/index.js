import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "app/actions/list";
import PayForm from "./PayForm";
import TransactionList from "./TransactionList";

class Home extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    return (
      <main className="container">
        <div className="row">
          <PayForm />
        </div>
        <div className="row">
          <TransactionList />
        </div>
      </main>
    );
  }
}

export default connect(
  ({ web3 }) => ({
    web3: web3.web3Instance
  }),
  { getTransactions }
)(Home);
