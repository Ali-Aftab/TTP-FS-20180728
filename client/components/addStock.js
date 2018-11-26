import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class addStock extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input name="amount" type="number" />
          <input type="text" name="stock" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault();
      console.log("handleSubmit WOOO");
      const stockPurchase = await axios.post("/stock/get", {
        taco: "bell"
      });
      console.log(stockPurchase);
    }
  };
};
export default connect(null, mapDispatch)(addStock);
