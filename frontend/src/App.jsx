import React from "react";
import Nav from "./components/nav";
import Home from "./components/Home";
import { Route,Routes } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/form" element={<Form/>} />
    </Routes>
    
  );
}
export default App;
