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
      this.setState({ status: "stocks!" });
      // }, 1000);
    }
  }
  render() {
    console.log(this);
    const assetInfo = this.props.state.user.companies;
    let names = [];
    console.log(names);
    // if (assetInfo && Object.is(assetInfo)) {
    console.log(assetInfo);
    names = Object.keys(assetInfo);
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Shares</th>
              <th className="table-header">Current Price</th>
              <th className="table-header">Total Value</th>
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
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </React.Fragment>
    );
    // } else {
    //   return <h3>No Stocks in your Inventory</h3>;
    // }
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
