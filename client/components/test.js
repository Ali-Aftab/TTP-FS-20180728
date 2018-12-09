// if (assetInfo && Object.is(assetInfo)) {
console.log(Object.is(assetInfo));
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
