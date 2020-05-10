import React from "react";
import Navigation from "./components/Navigation";
import Modal from "./components/modal";
import { Container } from "react-bootstrap";
import "./App.scss";

function App() {
  return (
    <React.Fragment>
      <Navigation />

      <Container>
        <h3>rolando</h3>
        <Modal />
      </Container>
    </React.Fragment>
  );
}

export default App;
