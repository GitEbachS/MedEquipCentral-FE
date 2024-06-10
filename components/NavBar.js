import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="navBar" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>MedEquipCentral</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link className="navHover">Home</Nav.Link>
            </Link>
            <Link passHref href="/favoritesList">
              <Nav.Link className="navHover">Favorites List</Nav.Link>
            </Link>
            <Link passHref href="/cart">
              <Nav.Link className="navHover">Cart</Nav.Link>
            </Link>
            <Link passHref href="/orderHistory">
              <Nav.Link className="navHover">Order History</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link className="navHover">Profile</Nav.Link>
            </Link>
            <Link passHref href="/similarItems">
              <Nav.Link className="navHover">Similar Items</Nav.Link>
            </Link>
            <Nav>
              <button className="signOutBtn" type="button" onClick={signOut}>
                Sign Out
              </button>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
