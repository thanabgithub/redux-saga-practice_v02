import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchUserStart } from "../redux/actions";

const Header = (props) => {
  const [showBasic, setShowBasic] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    // handleSubmit(e);
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searchInput", searchInput);
    dispatch(searchUserStart(searchInput));
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open" />
            </span>
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-white"
            onClick={() => setShowBasic((prev) => !prev)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <NavLink to="/" className="nav-link text-white">
                  Home
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/adduser" className="nav-link text-white">
                  Add user
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/about" className="nav-link text-white">
                  About
                </NavLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="search name ..."
            value={searchInput}
            onChange={handleInput}
          ></input>
          <MDBBtn color="dark" type="submit" style={{ marginRight: 10 }}>
            {" "}
            Search
          </MDBBtn>
        </form>
      </MDBNavbar>
    </>
  );
};

export default Header;
