import React, { createContext, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Join from "./components/Join";
import Create from "./components/Create";
import Delete from "./components/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Logout from "./components/Logout";
import reducer, { initialState } from "./reducer/UseReducer";

// create context
const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/server" element={<About />} />
      <Route path="/join" element={<Join />} />
      <Route path="/create" element={<Create />} />
      <Route path="/delete" element={<Delete />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing/>
      </UserContext.Provider>
    </>
  );
};

export default App;
export { UserContext };
