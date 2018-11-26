import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class addStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      stock: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const { amount, stock } = this.state;
    this.props.handleSubmit(evt, amount, stock, this.props.state.user.id);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name="stock">
          <label htmlFor="Amount">
            <small>Amount</small>
          </label>
          <input name="amount" type="number" onChange={this.handleChange} />
          <label htmlFor="Stock">
            <small>Stock</small>
          </label>
          <input name="stock" type="text" />
          <button type="submit">Buy</button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    state: state,
    id: state.id
  };
};

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt, amount, stock, id) {
      evt.preventDefault();
      console.log(evt.target);
      console.log(amount);
      console.log(id);
      const stockPurchase = await axios.post("/api/stock/get", {
        amount,
        stock,
        id
      });
      console.log(stockPurchase);
    }
  };
};
export default connect(mapState, mapDispatch)(addStock);

/*
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

const addStock = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name="stock">
        <label htmlFor="Amount">
          <small>Amount</small>
        </label>
        <input name="amount" type="number" />
        <label htmlFor="Stock">
          <small>Stock</small>
        </label>
        <input name="stock" type="text" />
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

const mapState = state => {
  return {
    state: state,
    id: state.id
  };
};

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      console.log(evt.target);
      console.log(this);
      const amount = evt.target.amount;
      // const id = this.props.state.user.id;
      const stock = evt.target.stock;
      console.log(amount);
      const stockPurchase = await axios.post("/api/stock/get", {});
      console.log(stockPurchase);
    }
  };
};
export default connect(mapState, mapDispatch)(addStock);

*/
