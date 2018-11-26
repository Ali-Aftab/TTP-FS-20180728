import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import AddStock from "./addStock";

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const userStock = axios("/stock");
  }
  render() {
    const { email } = this.props;

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <AddStock />
      </div>
    );
  }
}

// export const UserHome = props => {
//   const {email} = props
//   console.log(props)
//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
