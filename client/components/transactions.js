import React, { Component } from "react";
import { connect } from "react-redux";
import { allTransactions } from "../store";
import Moment from "react-moment";

class Transactions extends Component {
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
      <div className="float-center">
        <h2>Transactions</h2>
        <table align="center">
          <tbody>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Shares</th>
              <th className="table-header">Price per Stock</th>
              <th className="table-header">Date</th>
              <th className="table-header">buy or sell</th>
            </tr>

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
      </div>
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
