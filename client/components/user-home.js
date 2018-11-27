import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Portfolio from "./portfolio";

export class UserHome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const userStock = axios("/stock");
  }
  render() {
    const { firstName } = this.props;

    return (
      <div>
        <h3>Welcome, {firstName}</h3>
        <Portfolio props={this.props} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserHome);
