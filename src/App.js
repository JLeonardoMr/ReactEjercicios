import React from "react";
import { Routes, Route, Link } from "react-router-dom"
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionForm } from "./pages/form";
import MusicSearch from "./pages/MusicSearch";
import SelectNested from "./pages/SelectNested";
import ContacForm from "./pages/ContacForm";
import { Modals } from "./pages/Modals";
import SearchAppBar from "./components/materialnavbar";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Error404";
import { Users } from "./pages/Users";

function App() {

  return (
    <>
      <SearchAppBar />
      <Container fluid>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/musicsearch" element={<MusicSearch/>}/>
          <Route exact path="/select" element={<SelectNested/>}/>
          <Route exact path="/work" element={<SectionForm/>}/>
          <Route exact path="/contacform" element={<ContacForm/>}/>
          <Route exact path="/modal" element={<Modals />} />
          <Route exact path='/User/:username/:age' element={<Users/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
        {/* <MusicSearch/> */}
        {/* <SectionForm /> */}
        {/* <SelectNested/> */}
        {/* <ContacForm/> */}
      </Container>
    </>
  );
}

export default App;
