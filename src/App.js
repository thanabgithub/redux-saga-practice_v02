import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { isLoading } = useSelector((state) => state.dataUsers);
  return (
    <BrowserRouter>
      <div className="App" style={{ height: "100%" }}>
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addUser" element={<AddEditUser />} />
          <Route exact path="/editUser/:id" element={<AddEditUser />} />
          <Route exact path="/userInfo/:id" element={<UserInfo />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
