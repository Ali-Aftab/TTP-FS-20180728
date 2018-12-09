import React, { Component } from "react";
import { connect } from "react-redux";
import { allTransactions } from "../store";
import Moment from "react-moment";

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
            <th>Date</th>
            <th>buy or sell</th>
          </tr>
          <tbody>
            {this.props.transactions
              ? this.props.transactions.map(t => {
                  return (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.amount}</td>
                      <td>{t.price}</td>
                      <td>
                        <Moment date={t.date} format="MM-DD-YYYY @ HH:mm" />
                      </td>
                      <td>{t.exchange}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
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
