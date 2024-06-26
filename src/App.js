import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Loginup from "./component/Loginup";
import Signup from "./component/Signup";
import { useState } from "react";
function App() {
  const[alert,setalert]=useState(null);
  const showalert=(message,type)=>{
setalert({
  msg:message,
  type:type
});
setTimeout(() => {
  setalert(null);
}, 1500);}
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route exact path="/about" element={ <About />}>
           
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/" element={ <Home showalert={showalert} />}>
           
          </Route>
          <Route exact path="/signup" element={ <Signup showalert={showalert}/>}>
           
          </Route>
          <Route exact path="/login" element={ <Loginup showalert={showalert}/>}>
           
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
