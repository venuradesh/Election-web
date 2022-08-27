import React, { useMemo, useState } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import About from "./pages/about/aboutus";
import Contact from "./pages/contact/contact";
import DataList from "./pages/data/data";
import Results from "./pages/results/resulsts";
import Visualization from "./pages/visualization/visualization";
import DataViewer from "./pages/viewer/viewer";
import Home from "./pages/home/home";
import LoadingScreen from "./pages/LoadingScreen";
import Header from "./compononts/header";

function App() {
  const [userIn, setUserIn] = useState();

  useMemo(() => {
    Auth.currentUserInfo()
      .then((res) => setUserIn(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={!userIn ? <Home /> : <Dashboard />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/aboutus" element={<About />}></Route>
          <Route exact path="/contactus" element={<Contact />}></Route>
          <Route exact path="/results" element={<Results />}></Route>
          <Route exact path="/visualization" element={<Visualization />}></Route>
          <Route exact path="/data" element={<DataList />}></Route>
          <Route exact path="/viewer" element={<DataViewer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
