import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Icon
} from "semantic-ui-react";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          <Link to={'/all-superpowers'}>
            SUPERmarket
          </Link>
        </Menu.Item>
        <Menu.Item as="a">Home</Menu.Item>
        {isLoggedIn ? (
          <Menu.Item as="a" position="right">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Menu.Item>
        ) : (
          <Menu.Item as="a" position="right">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Icon className="shopping cart big icon" />
        </Menu.Item>
      </Container>
    </Menu>
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
