import React, { Component } from "react";
import { connect } from "react-redux";

class addStock extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(evt) {}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
    handleSubmit(evt) {
      evt.preventDefault();
    }
  };
};
export default connect(null, mapDispatch)(addStock);
