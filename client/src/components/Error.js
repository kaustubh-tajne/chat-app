import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <section className="conatiner d-flex flex-column justify-content-center align-items-center pt-5">
        <h1>404 Not Found</h1>
        <NavLink to={"/"}>
          <button type="button" className="btn btn-info">
            Go to Home Page
          </button>
        </NavLink>
      </section>
    </>
  );
};

export default Error;
