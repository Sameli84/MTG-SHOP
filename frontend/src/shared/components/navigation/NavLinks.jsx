import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  const logoutUser = () => {
    // Remove token from local storage
    auth.logout();
  };

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
      <Navbar.Brand style={{ marginLeft: 10 }} as={NavLink} to="/">
        Mtg cards for sale
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/">
            ALL CARDS
          </Nav.Link>
          {auth.isLoggedIn && (
            <Nav.Link as={NavLink} to="/cards/new">
              ADD CARD
            </Nav.Link>
          )}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {!auth.isLoggedIn && (
              <NavDropdown.Item as={NavLink} to="/auth">
                AUTHENTICATE
              </NavDropdown.Item>
            )}
            {auth.isLoggedIn && (
              <NavDropdown.Item onClick={logoutUser}>LOGOUT</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavLinks;
