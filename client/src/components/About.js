import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const About = () => {

  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(0);

  const [serverChats, setServerChats] = useState([]);

  const [userData, setUserData] = useState({
    sname: "",
    message: "",
  });

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("Data:");
      console.log(data);
      setServerChats(data.messages);
      console.log("serverChats");
      console.log(serverChats);
      setUserData({ ...userData, sname: data.sname });

      if (res.status !== 200 || !data) {
        alert("User not Found");
        navigate("/join");
      }
      else {
        dispatch({type: "USER", payload: true});
      }

    } catch (error) {
      console.log(error);
      navigate("/join");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, [refresh]);

  const InputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // send the data to backend
  const messageSent = async (e) => {
    e.preventDefault();

    const { sname, message } = userData;

    if (!message) {
      return alert("Please fill the message box");
    }

    try {
      console.log(sname, message);
      const res = await fetch("/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sname, message }),
      });
      console.log(sname, message);

      const data = await res.json();
      // console.log("data post: 11");
      // console.log(data);

      if (!data) {
        alert("Message not sent!");
      } else {
        // alert("Message send");
        setRefresh(refresh + 1);
      }

      setUserData({ ...userData, message: "" });
    } catch (error) {
      console.log(error);
      alert("Something wrong! Try again00");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div
            className="col-lg-10 col-md-10 col-12 col-xxl-10 mx-auto"
            id="navbar-example2"
            style={{ position: "relative" }}
          >
            <nav
              id="navbar-example2"
              className="navbar navbar-light bg-light px-3"
            >
              <a className="navbar-brand" href="#sendMessageBlock">
                Chatting{" "}
                <button
                  onClick={() => setRefresh(refresh + 1)}
                  className="btn btn-outline-success refreshSpan"
                >
                  {" "}
                  Refresh{" "}
                </button>
              </a>
            </nav>
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-offset="0"
              className="scrollspy-example py-2"
              tabIndex="0"
              style={{
                height: "75vh",
                overflowY: "scroll",
                position: "relative",
                bottom: "0",
              }}
            >
              <>
                {serverChats.map((ele, ind) => {
                  return (
                    <div className="box-chat">
                      <p>{ele.message}</p>
                    </div>
                  );
                })}
              </>
            </div>
          </div>

          <div id="sendMessageBlock" className="col-lg-10 col-md-10 col-12 col-xxl-10 mx-auto my-4">
            <div className="row g-3">
              <form method="POST">
                <div
                  className="input-group col-lg-10 col-md-10 col-12 col-xxl-10 mx-auto"
                  style={{ minHeight: "100px", marginBottom: "0.6rem" }}
                >
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Enter message here..."
                    value={userData.message}
                    onChange={InputEvent}
                    name="message"
                  ></textarea>
                </div>

                <div className="col-lg-2 col-md-2 col-2 col-xxl-2 ">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={messageSent}
                  >
                    Send
                  </button>
                </div>
              </form>

              <a className="navbar-brand" href="#sendMessageBlock">
                <button
                  onClick={() => setRefresh(refresh + 1)}
                  className="btn btn-outline-success refreshSpan"
                >
                  {" "}
                  Refresh{" "}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
