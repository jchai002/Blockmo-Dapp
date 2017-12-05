import React, { Component } from "react";

class SendForm extends Component {
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignUpFormSubmit(this.state.name);
  }

  render() {
    return (
      <form
        className="col-xs-12 col-md-8 col-md-offset-2"
        onSubmit={this.handleSubmit}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            onChange={this.onAddressChange}
            value={this.state.address}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            onChange={this.onAmountChange}
            value={this.state.amount}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Note"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <input type="submit" className="form-control" />
        </div>
      </form>
    );
  }
}

export default SendForm;