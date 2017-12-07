import React, { Component } from "react";
import { connect } from "react-redux";
import { pay } from "app/actions/pay";
import ethereumLogo from "app/assets/images/eth.png";

class PayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: "",
      note: ""
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
    this.props.pay(this.state);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="pay-form" onSubmit={this.handleSubmit}>
          <div className="row-space-between row-80-20">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={this.onAddressChange}
              value={this.state.address}
            />
            <input
              type="number"
              className="form-control"
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
export default connect(({ status }) => ({ status }), { pay })(PayForm);
