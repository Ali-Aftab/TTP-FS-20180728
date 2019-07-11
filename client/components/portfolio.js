import React, { Component } from "react";
import { connect } from "react-redux";
import { buyNewStock } from "../store";
import Assets from "./assets";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      stock: "",
      cash: props.state.user.cash
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const { amount, stock } = this.state;
    const result = this.props.handleSubmit(
      evt,
      amount,
      stock,
      this.props.state.user.id
    );
    if (result) {
      this.setState({
        cash: result.data.cash
      });
      window.alert(result.data.message);
    }
    location.reload();
  }

  render() {
    return (
      <div className="white">
        <div className="floatleft">
          <h2>Your assets</h2>
          <Assets state={this.props.state} />
        </div>
        <div className="floatright">
          <h2>You have ${this.state.cash} in cash!</h2>
          <form onSubmit={this.handleSubmit} name="stock">
            <label htmlFor="Amount">
              <small>Amount</small>
            </label>
            <input name="amount" type="number" onChange={this.handleChange} />
            <label htmlFor="Stock">
              <small>Stock</small>
            </label>
            <input name="stock" type="text" onChange={this.handleChange} />
            <br />
            <br />
            <button type="submit">Buy</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    state: state,
    id: state.id,
    cash: state.user.cash
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, amount, stock, id) {
      evt.preventDefault();
      dispatch(buyNewStock(amount, stock, id));
    }
  };
};
export default connect(mapState, mapDispatch)(Portfolio);
