import React,{ useState } from "react";
import { Container} from "react-bootstrap";
import "./components/Bootstrap";
import {SectionForm} from "./components/form";
import MaterialUI from "./components/MaterialUI";

function App() {
  
  return (
    <div className="App">
        <>
          <MaterialUI />
        </>
      {/* <section>
        <h1>Frameworks CSS SCSS con React</h1>
        <section>
          <Bootstrap />
        </section>
      </section> */}
      <Container fluid>
        <h3>Ejercicios Seccion 1</h3>
        <SectionForm/>
        
      </Container>
    </div>
  );
}

export default App;
