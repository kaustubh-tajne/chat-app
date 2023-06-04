import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const RenderMenu = () => {
  const { state, dispatch } = useContext(UserContext);

  if (state) {
    return (
      <>
        <NavLink to="/logout" role="button">
          <button className="btn buttonOff" type="button">
            Logout Server
          </button>
        </NavLink>
      </>
    );
  } else {
    return (
      <>
        <NavLink to="/join" role="button">
          <button className="btn buttonOff" type="button">
            Join Server
          </button>
        </NavLink>

        <NavLink to="/create" role="button">
          <button className="btn buttonOff" type="button">
            Create Server
          </button>
        </NavLink>

        <NavLink to="/delete" role="button">
          <button className="btn buttonOff" type="button">
            Delete Server
          </button>
        </NavLink>
      </>
    );
  }
};

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Make Server
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/server">
                  Server
                </NavLink>
              </li>
            </ul>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <RenderMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
