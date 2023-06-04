import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Join = () => {

  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    sname:"",
    password:""
  });

  const InputEvent = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const JoinServer = async (e) => {
    e.preventDefault();

    const {sname, password} = user;

    if (!sname || !password) {
      return alert( "Please fill info properly");
    }

    try {
      const res = await fetch('/join', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sname, password
        })
      });

      const data = await res.json();

      if (res.status === 422) {
        return alert("Invalid Credentials")
      }

      if (res.status === 200) {
        dispatch({type: "USER", payload: true});
        alert("You join server successfully");
        navigate('/server');
      }

    } catch (error) {
      alert("Something wrong please try again!");
    }

  }

  return (
    <>
      <section className="container">
        <h2 className="text-center mt-5">Join Server</h2>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-4 col-10 col-xxl-4 p-3 mx-auto bg-light rounded-3">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="sname" className="form-label">
                  Server Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sname"
                  aria-describedby="emailHelp"
                  name="sname"
                  value={user.sname}
                  onChange={InputEvent}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={InputEvent}
                />
              </div>
             
              <button type="submit" className="btn btn-primary" onClick={JoinServer}>
                Join Server
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Join;
