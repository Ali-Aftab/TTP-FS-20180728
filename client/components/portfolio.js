import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStock, buyNewStock } from "../store";
import axios from "axios";

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
  componentDidMount() {
    this.props.getStock(this.props.state.user.id);
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
      console.log(result);
      window.alert(result.data.message);
    }
    location.reload();
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="floatleft">
          <h2>Your assets</h2>
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
            <br />
            <input name="stock" type="text" onChange={this.handleChange} />
            <button type="submit">Buy</button>
          </form>
        </div>
      </React.Fragment>
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
    },
    getStock: id => dispatch(getAllStock(id))
  };
};
export default connect(mapState, mapDispatch)(Portfolio);
