import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStock, buyNewStock, stockTimerStock } from "../store";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "no stocks"
    };
  }

  async componentDidMount() {
    const setState = this.setState.bind(this);
    const { getStock } = await this.props;
    const userId = this.props.state.user.id;
    if (this.props && getStock && userId) {
      // this.timer = setInterval(function() {
      getStock(userId);
      setState({ status: "stocks!" });
      // }, 1000);
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  render() {
    const assetInfo = this.props.state.user.companies;
    let names = [];
    if (assetInfo !== undefined) {
      names = Object.keys(assetInfo);
      let cash = this.props.cash;
      let total = cash;
      for (let key in assetInfo) {
        let amount = assetInfo[key].quote.latestPrice;
        let price = assetInfo[key].amount;
        total += Number(amount) * Number(price);
      }
      return (
        <React.Fragment>
          <table align="center">
            <tbody>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Shares</th>
                <th className="table-header">Current Price</th>
                <th className="table-header">Total Value</th>
                <th className="table-header">Today's Change</th>
              </tr>
              {assetInfo
                ? names.map(a => {
                    return (
                      <tr
                        key={assetInfo[a].quote.companyName}
                        className={assetInfo[a].color}
                      >
                        <td>{a}</td>
                        <td>{assetInfo[a].amount}</td>
                        <td>{assetInfo[a].quote.latestPrice}</td>
                        <td>
                          {Number(assetInfo[a].quote.latestPrice) *
                            Number(assetInfo[a].amount)}
                        </td>
                        <td>{assetInfo[a].quote.change}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
          <h3>Your Portfolio is worth ${total}</h3>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>No Stocks</h1>
        </React.Fragment>
      );
    }
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
    getStock: id => dispatch(getAllStock(id)),
    timer: id => dispatch(stockTimerStock(id))
  };
};
export default connect(mapState, mapDispatch)(Assets);
