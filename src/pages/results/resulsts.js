import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "aws-amplify";

//components
import Header from "../../compononts/header";
import "./results.css";

function Results() {
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
        <div className="results">
          <Header />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Results;
