import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

function Navbars() {
  const isLoggedIn = Boolean(localStorage.getItem("session"));
  // localStorage.setItem('username', ) 
  // const usernames = localStorage.getItem('username');
  const handleLogout = () => {
   axios
     .delete(
       `${process.env.REACT_APP_BASE_URL}authentication/session?api_key=${process.env.REACT_APP_TMDB_KEY}`,
       {
         data: {
           session_id: localStorage.getItem("session"),
         },
       }
     )
     .then((res) => {
       console.log(res);
       localStorage.removeItem("session");
       window.location.assign("/profile");
     });
  };
  if (isLoggedIn) {
    return (
      <>
        <Navbar bg="dark" expand="lg" variant="dark" className="navbar">
          <Container fluid>
            <Navbar.Brand href="#" className="judul">
              <span style={{ color: "#ff512f" }}>List</span>
              <span style={{ color: "#dd2476" }}>Film</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/profile">Home</Nav.Link>
                <Nav.Link href="/profile">{usernames}</Nav.Link>
                <Button variant="outline-success" onClick={handleLogout}>
                  Log out
                </Button>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar bg="dark" expand="lg" variant="dark" className="navbar">
          <Container fluid>
            <Navbar.Brand href="#" className="judul">
              <span style={{ color: "#ff512f" }}>List</span>
              <span style={{ color: "#dd2476" }}>Film</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/profile">Home</Nav.Link>
                <Button variant="outline-success" href="./login">
                  Log in
                </Button>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navbars;
