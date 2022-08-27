import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "aws-amplify";

//components
import Header from "../../compononts/header";
import "./visualization.css";

function Visualization() {
  const [userLogged, setUserLogged] = useState();

  useMemo(() => {
    Auth.currentUserInfo()
      .then((res) => {
        setUserLogged(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {userLogged !== null ? (
        <div className="visualization">
          <Header />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Visualization;
