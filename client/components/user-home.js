import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import AddStock from "./addStock";

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
        <AddStock props={this.props} />
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
