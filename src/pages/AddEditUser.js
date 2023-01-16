import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUserStart, updateUserStart } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const timeoutInterval = 1000;

const AddEditUser = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`id: ${id}`);
  const [formValue, setFormValue] = useState(initialState);
  const { users, isLoading, error } = useSelector((state) => state.dataUsers);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const thisUser = users.find((item) => item.id === parseInt(id));
      console.log(thisUser);
      setFormValue((prev) => {
        return { ...prev, ...thisUser };
      });
    } else {
      setIsEditMode(false);
      setFormValue(initialState);
    }
  }, [id]);

  const { name, email, phone, address } = formValue;
  const dispatch = useDispatch();

  useEffect(() => {
    isLoading && isSubmitting && !isEditMode && toast.info("Adding");
    isLoading && isSubmitting && isEditMode && toast.info("Updating");
  }, [isLoading, isSubmitting, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address && !isLoading && !isSubmitting) {
      setIsSubmitting(true);
      if (isEditMode) {
        dispatch(updateUserStart({ id, formValue }));

        setTimeout(() => {
          navigate("/");
          setIsSubmitting(false);
        }, timeoutInterval);
      } else {
        dispatch(createUserStart(formValue));

        setTimeout(() => {
          navigate("/");
          setIsSubmitting(false);
        }, timeoutInterval);
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue((prevForm) => {
      return { ...formValue, [name]: value };
    });
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ height: "100%" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add User Detail </p>
      <ToastContainer
        position="top-right"
        autoClose={timeoutInterval}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
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
          {isEditMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn onClick={() => navigate("/")} color="danger">
          go back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
