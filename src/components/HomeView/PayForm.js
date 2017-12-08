import React, { Component } from "react";
import { connect } from "react-redux";
import { pay } from "app/actions/pay";
import ethereumLogo from "app/assets/images/eth.png";

@connect(({ status }) => ({ status }), { pay })
export default class PayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: "",
      note: "",
      addressValid: true,
      amountValid: true
    };
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  onAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  onNoteChange(event) {
    this.setState({ note: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // validate address format
    if (!/^(0x)?[0-9a-f]{40}$/i.test(this.state.address)) {
      this.setState({ addressValid: false });
      return false;
    } else {
      this.setState({ addressValid: true });
    }
    // validate amount is not 0 or less
    if (0 >= this.state.amount) {
      this.setState({ amountValid: false });
      return false;
    } else {
      this.setState({ amountValid: true });
    }
    this.props.pay(this.state);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="pay-form" onSubmit={this.handleSubmit}>
          <div className="row-space-between row-80-20">
            <input
              type="text"
              className={`form-control ${
                !this.state.addressValid ? "error" : ""
              }`}
              placeholder="Address"
              onChange={this.onAddressChange}
              value={this.state.address}
            />
            <input
              type="number"
              className={`form-control ${
                !this.state.amountValid ? "error" : ""
              }`}
              placeholder="Amount"
              onChange={this.onAmountChange}
              value={this.state.amount}
            />
          </div>
          <textarea
            type="text"
            className="form-control"
            placeholder="Note"
            onChange={this.onNoteChange}
            value={this.state.note}
          />
          <div className="row-space-between">
            <input type="submit" className="form-control submit" />
            <div
              className={`status animated infinite pulse ${!this.props.status
                .mining && "hidden"}`}
            >
              <img src={ethereumLogo} />
              Waiting for blocks...
            </div>
          </div>
        </form>
      </div>
    );
  }
}
