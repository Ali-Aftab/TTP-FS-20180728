import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="home">
    <h1>Stocker</h1>
    <nav>
      {isLoggedIn ? (
        <React.Fragment>
          <div>
            <Link to="/home">Portfolio</Link>
            <Link to="/transactions">Transactions</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </React.Fragment>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
