import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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

const Navbar = ({ handleClick, isLoggedIn, user }) => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Link to={'/all-superpowers'}>
              SUPERmarket
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/home'}>
              Home
            </Link>
          </Menu.Item>
          {isLoggedIn ? (
            <Menu.Item position="right">
              {/* The navbar will show these links after you log in */}
              <h4 style={{marginRight: '8em', marginBottom: '0.1em'}}>Hello {'' + user.firstName}</h4>
              {
                user.isAdmin &&
                <Link to={'/users-list'}>
                  <Button style={{marginRight: '8em'}} primary>Admin</Button>
                </Link>
              }
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </Menu.Item>
          ) : (
            <Menu.Item position="right">
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
            <Link to="/cart">
              <Icon className="shopping cart big icon" style={{marginRight: '1em'}} />
            </Link>
            {isLoggedIn ?
              (<Link to={'/my-account'}>
                Account
              </Link>) :
              null
            }
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  )
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
