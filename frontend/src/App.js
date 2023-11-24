import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import AddEmp from "./component/AddEmp";
import UpdateEmp from "./component/UpdateEmp";
import Login from "./component/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/add" element={<AddEmp />}></Route>
        <Route path="/update/:id" element={<UpdateEmp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
