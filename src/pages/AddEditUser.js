import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = (props) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, phone, address } = formValue;
  const handleSubmit = () => {};
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ height: "100%" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add User Detail </p>
      <div
        style={{
          margin: "auto",
          padding: 15,
          maxWidth: 400,
          alignContent: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <br />
        <MDBInput
          value={name}
          name="name"
          type="text"
          onChange={handleInputChange}
          required
          label="name"
          validation="Please provide a name"
        />
        <br />
        <MDBInput
          value={email}
          name="email"
          type="text"
          onChange={handleInputChange}
          required
          label="email"
          validation="Please provide a email"
        />
        <br />
        <MDBInput
          value={phone}
          name="phone"
          type="text"
          onChange={handleInputChange}
          required
          label="phone"
          validation="Please provide a phone"
        />
        <br />
        <MDBInput
          value={address}
          name="address"
          type="text"
          onChange={handleInputChange}
          required
          label="address"
          validation="Please provide a address"
        />
      </div>
      <div className="col-12">
        <MDBBtn style={{ marginRight: 10 }} type="submit">
          Add
        </MDBBtn>
        <MDBBtn onClick={() => navigate("/")} color="danger">
          go back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
