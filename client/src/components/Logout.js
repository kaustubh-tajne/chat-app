import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            credentials: "include"
        }).then((res) => {
            if (res.status !== 200) {
                alert("Something wrong in logout!");
            }
            else {
                dispatch({type: "USER", payload:false});
                navigate('/join');
            }
        }).catch((err) => {
            console.log(err);
        })
    })

  return (
    <>
        <h1>Logout Page</h1>
    </>
  )
}

export default Logout;