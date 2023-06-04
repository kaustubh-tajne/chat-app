import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    sname: "",
    password: "",
    cpassword: "",
    delpassword: "",
    cdelpassword: "",
  });

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { sname, password, cpassword, delpassword, cdelpassword } = user;

    if (!sname || !password || !cpassword || !delpassword || !cdelpassword) {
      return alert("Please fill all fields");
    }

    if (password !== cpassword) {
      return alert("Password is not matching");
    }

    if (delpassword !== cdelpassword) {
      return alert("Delete Password is not matching");
    }

    try {
      const res = await fetch("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sname,
          password,
          cpassword,
          delpassword,
          cdelpassword,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        return alert("Servre Already Exits!\nTry Again");
      }

      if (!data) {
        return alert("Server creation failed!\nTry Again");
      }

      if (res.status === 201) {
        alert("Server Created Successfully!");
        navigate("/join");
      }
    } catch (error) {
      alert("Something wrong please try again!");
    }
  };

  return (
    <>
      <section className="container">
        <h2 className="text-center mt-2">Create Server</h2>
        <div className="row mt-2">
          <div className="col-lg-4 col-md-4 col-10 col-xxl-4 p-3 mx-auto bg-light">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="sname" className="form-label">
                  Server Name
                </label>
                <input
                  onChange={InputEvent}
                  value={user.sname}
                  type="text"
                  className="form-control"
                  id="sname"
                  aria-describedby="emailHelp"
                  name="sname"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={InputEvent}
                  value={user.password}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  onChange={InputEvent}
                  value={user.cpassword}
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="delpassword" className="form-label">
                  Delete Password
                </label>
                <input
                  onChange={InputEvent}
                  value={user.delpassword}
                  type="password"
                  className="form-control"
                  id="delpassword"
                  name="delpassword"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cdelpassword" className="form-label">
                  Confirm Delete Password
                </label>
                <input
                  onChange={InputEvent}
                  value={user.cdelpassword}
                  type="password"
                  className="form-control"
                  id="cdelpassword"
                  name="cdelpassword"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={PostData}
              >
                Create Server
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Create;
