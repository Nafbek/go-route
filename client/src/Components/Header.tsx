import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { Link } from "react-router-dom";
import "../CSS/Header.css";

export default function Header() {
  return (
    <>
      <header className="sticky-top">
        <Navbar>
          <div className="container">
            <Navbar.Brand>
              <Link to="/" title="Go to home">
                <h1>goRoute</h1>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic navbar-nav" />
          </div>

          <Navbar.Collapse id="basic navbar-nav">
            <div className="conatainer">
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/documentation" className="nav-link">
                  Documentation
                </Nav.Link>

                {/* this link is ideal for the driver to view their route */}

                <Nav.Link as={Link} to="/dashboard" className="nav-link">
                  Dashboard
                </Nav.Link>

                <NavDropdown title="Action" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/package">
                    Create a route
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/package/modify">
                    Modify
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/">
                    Remove
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}
