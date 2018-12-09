import React, { Component } from "react";

export default class assets extends Component {
  render() {
    console.log(this);
    const assetInfo = this.props.state.user.companies;
    let names = [];
    if (assetInfo) {
      names = Object.keys(assetInfo);
    }

    return (
      <React.Fragment>
        <table>
          <tr>
            <th>Name</th>
            <th>Shares</th>
            <th>Current Price</th>
            <th>Total Value</th>
          </tr>
          <tbody>
            {assetInfo
              ? names.map(a => {
                  console.log(assetInfo[a]);
                  return (
                    <tr key={assetInfo[a].quote.companyName}>
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
  }
}
