import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Delete = () => {

  const navigate = useNavigate();

  const [serverInfo, setServerInfo] = useState({
    sname:"",
    delpassword:""
  })

  const InputEvent = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setServerInfo({
      ...serverInfo,
      [name]: value
    })
  }

  const PostData = async (e) => {
    e.preventDefault();

    const {sname, delpassword} = serverInfo;

    if (!sname || !delpassword) {
      return alert("Please fill the Info properly!");
    }

    try {
      const res = await fetch('/delete', {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({sname, delpassword})
      })

      const data = await res.json();
      console.log("delete data here");
      console.log(data);

      if(res.status === 500) {
        return alert("Server does not exits!");
      }

      if(res.status === 401) {
        return alert("Password is not matching");
      }

      if (res.status === 200) {
        alert("Server Deleted Successfully!")
        setServerInfo({sname:"",delpassword:""});
        navigate('/join');
      }

    } catch (error) {
      alert("Somthing wrong! Please try again");
      console.log(error);
    }
  }

  return (
    <>
      <section className="container">
        <h2 className="text-center mt-5">Delete Server</h2>
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
                  value={serverInfo.sname}
                  onChange={InputEvent}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Delete Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="delpassword"
                  value={serverInfo.delpassword}
                  onChange={InputEvent}
                />
              </div>
             
              <button type="submit" className="btn btn-primary" onClick={PostData}>
                Delete Server
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Delete;