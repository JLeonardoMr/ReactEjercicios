import React from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionForm } from "./components/form";
import MaterialUI from "./components/MaterialUI";

function App() {

  return (
    <div className="App">
      <Container fluid className="px-0">
        <MaterialUI />
        <SectionForm />
      </Container>
    </div>
  );
}

export default App;
