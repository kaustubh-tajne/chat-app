import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import chatsImg from "./chats.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="container">
        <div className="row mt-3">
          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 d-flex flex-column justify-content-center align-items-start p-2">
            <h1>
              Welcome to <br />
              <span className="makeServer">The Make Server</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae non
              quod sunt quaerat incidunt. Laboriosam distinctio delectus
              molestiae non repellat!
            </p>
            <div>
              {/* <NavLink className="" to="/join" role="button">
                <button type="button" className="btn btn-secondary me-2">
                  Join Server
                </button>
              </NavLink> */}
              <NavLink className="" to="/server" role="button">
                <button type="button" className="btn btn-outline-info">
                  Goto Server
                </button>
              </NavLink>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 col-xxl-6 chatImg">
            <figure>
              <img src={chatsImg} alt="img" className="img-fluid" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
