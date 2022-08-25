import Dashboard from "./pages/dashboard/dashboard";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import About from "./pages/about/aboutus";
import Contact from "./pages/contact/contact";
import DataList from "./pages/data/data";
import Results from "./pages/results/resulsts";
import Visualization from "./pages/visualization/visualization";
import DataViewer from "./pages/viewer/viewer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/login" element={<Dashboard />}></Route>
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
