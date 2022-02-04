import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { SectionForm } from "./pages/form";
import MusicSearch from "./pages/MusicSearch";
import SelectNested from "./pages/SelectNested";
import ContacForm from "./pages/ContacForm";
import { Modals } from "./pages/Modals";
import SearchAppBar from "./components/materialnavbar";
import { Home } from "./pages/Home";
// import { Error404 } from "./pages/Error404";
import { Productos } from "./pages/Productos";
import { Users } from "./pages/Users";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { User } from "./components/User";
import Contador from "./pages/Contador";
import { Lenguaje } from "./pages/Lenguaje";
import { Suma } from "./pages/Suma";
import { ReduxApp } from "./pages/reduxApp";

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<SearchAppBar />}>
          <Route index element={<Home />} />
          <Route exact path="musicsearch" element={<MusicSearch />} />
          <Route exact path="select" element={<SelectNested />} />
          <Route exact path="work" element={<SectionForm />} />
          <Route exact path="lenguaje" element={<Lenguaje />} />
          <Route exact path="contacform" element={<ContacForm />} />
          <Route exact path="modal" element={<Modals />} />
          <Route exact path="contador" element={<Contador />} />
          <Route exact path="productos" element={<Productos />} />
          <Route exact path="reduxApp" element={<ReduxApp />} />
          <Route exact path="about" element={<About />} />
          <Route exact path="calculadora" element={<Suma />} />
          {/*OJITO CON ESTAS REDIRECIONES */}
          <Route exact path={'/user'} element={<Navigate replace to="/users" />} />
          {/*OJITO CON ESTAS REDIRECIONES */}
          <Route exact path="users" element={<Users />} >
            {/* en este beta de index podemos llamar a un archivo que tenga una vista principal de informacion */}
            <Route index element={<div>Selecione un usuario</div>} />
            {/* ver el ejemplo */}
            <Route exact path=":userId" element={<User />} />
          </Route>
          <Route exact path="login" element={<Login />} />
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path={'*'} element={<Navigate replace to="/" />} />
          {/* <Route path="/*" element={<Error404 />} /> */}
        </Route>
      </Routes>
      {/* <MusicSearch/> */}
      {/* <SectionForm /> */}
      {/* <SelectNested/> */}
      {/* <ContacForm/> */}
    </>
  );
}

export default App;

