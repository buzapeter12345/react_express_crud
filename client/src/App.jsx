import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmberHozzaad from "./pages/EmberHozzaad";
import Footer from "./components/Footer";
import Osszesember from "./pages/Osszesember";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" className="menusor">
          <Container>
            <Navbar.Brand href="/">Ember</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Főoldal</Nav.Link>
                <Nav.Link href="/emberHozzaad">Ember felvétele</Nav.Link>
                <Nav.Link href="/osszesember">Összes ember mutatása</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emberHozzaad" element={<EmberHozzaad />} />
          <Route path="/osszesember" element={<Osszesember />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
