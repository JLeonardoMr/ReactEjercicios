import React from "react";
import { Container } from "react-bootstrap";
import "./components/Bootstrap";
import { SectionForm } from "./components/form";
import MaterialUI from "./components/MaterialUI";

function App() {

  return (
    <div className="App">
      <Container fluid className="px-0">
        <MaterialUI />
      </Container>
      {/* <section>
        <h1>Frameworks CSS SCSS con React</h1>
        <section>
          <Bootstrap />
        </section>
      </section> */}
      <Container fluid>
        <SectionForm />
      </Container>
    </div>
  );
}

export default App;
