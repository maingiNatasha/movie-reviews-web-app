import React from 'react';
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = ({ user, logout }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary px-3" >
            <Navbar.Brand href="/" className='me-auto' style={{ fontWeight: 'bold' }}>Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link>
                        <Link to={"/movies"}>Movies</Link>
                    </Nav.Link>
                    <Nav.Link>
                        { user ? (
                            <a href='#login' onClick={logout}>Logout User</a>
                        ) : (
                            <Link to={"/login"}>Login</Link>
                        )}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation