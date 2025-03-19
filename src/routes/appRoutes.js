import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../views/login";
import Inicio from "../views/inicio";
import MenuManager from "../views/manager/menuManager";
import TypeCreate from "../views/manager/types/create";
import TypeEdit from "../views/manager/types/edit";
import TypeIndex from "../views/manager/types/index";
import GroupCreate from "../views/manager/groups/create";
import GroupEdit from "../views/manager/groups/edit";
import GroupIndex from "../views/manager/groups/index";
import NoteCreate from "../views/manager/notes/create";
import NoteEdit from "../views/manager/notes/edit";
import NoteIndex from "../views/manager/notes/index";
import PokemonIndex from "../views/manager/pokemons/index";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/menuManager" element={<MenuManager />} />
        <Route path="/type/create" element={<TypeCreate />} />
        <Route path="/type/edit/:id" element={<TypeEdit />} />
        <Route path="/type/index" element={<TypeIndex />} />
        <Route path="/group/create" element={<GroupCreate />} />
        <Route path="/group/edit/:id" element={<GroupEdit />} />
        <Route path="/group/index" element={<GroupIndex />} />
        <Route path="/note/create" element={<NoteCreate />} />
        <Route path="/note/edit/:id" element={<NoteEdit />} />
        <Route path="/note/index" element={<NoteIndex />} />
        <Route path="/pokemon/index" element={<PokemonIndex /> } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
