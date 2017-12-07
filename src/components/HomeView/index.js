import React, { Component } from "react";
import { connect } from "react-redux";
import { getTransactions } from "app/actions/transactions";
import PayForm from "./PayForm";
import TransactionList from "./TransactionList";

class Home extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    return (
      <div className="row">
        <PayForm />
        <TransactionList />
      </div>
    );
  }
}

export default connect(
  ({ web3 }) => ({
    web3: web3.web3Instance
  }),
  { getTransactions }
)(Home);
