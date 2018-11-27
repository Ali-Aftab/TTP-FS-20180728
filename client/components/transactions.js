import React, { Component } from "react";
import { connect } from "react-redux";
import { allTransactions } from "../store";

class Transactions extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   transactions: []
    // };
  }
  componentDidMount() {
    const transactions = this.props.getTransactions(this.props.id);
    // console.log(transactions);
  }
  render() {
    let cash = 0;
    if (this.props.state.user) {
      cash = this.props.state.user.cash;
    }
    console.log(this);
    return <h1>Hi</h1>;
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    state: state,
    transactions: state.user.transactions
  };
};
const mapDispatch = dispatch => {
  return {
    getTransactions: id => dispatch(allTransactions(id))
  };
};
export default connect(mapState, mapDispatch)(Transactions);
