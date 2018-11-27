import React, { Component } from "react";
import { connect } from "react-redux";
import { allTransactions } from "../store";

// import Table from "material-ui/Table";
// import TableBody from "material-ui/TableBody";
// import TableCell from "material-ui/TableCell";
// import TableHead from "material-ui/TableHead";
// import TableRow from "material-ui/TableRow";
// import Paper from "material-ui/Paper";

class Transactions extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   transactions: []
    // };
  }
  componentDidMount() {
    const transactions = this.props.getTransactions(this.props.id);
  }
  render() {
    let cash = 0;
    if (this.props.state.user) {
      cash = this.props.state.user.cash;
    }
    console.log(this);
    return (
      <React.Fragment>
        <h1>Transactions</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Shares</th>
            <th>Price per Stock</th>
          </tr>
          {this.props.transactions
            ? this.props.transactions.map(t => {
                return (
                  <tr key={t.id}>
                    <th>{t.name}</th>
                    <th>{t.amount}</th>
                    <th>{t.price}</th>
                  </tr>
                );
              })
            : ""}
        </table>
      </React.Fragment>
    );
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
