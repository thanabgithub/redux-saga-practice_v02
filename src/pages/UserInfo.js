import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

const UserInfo = (props) => {
  const { id } = useParams();
  const { users, isLoading, error } = useSelector((state) => state.dataUsers);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (id) {
      const thisUser = users.find((item) => item.id === parseInt(id));
      console.log(thisUser);
      setUserInfo((prev) => {
        return { ...prev, ...thisUser };
      });
    }
  }, [id]);
  console.log("Object.keys(userInfo).length");

  console.log(userInfo);
  const hasUserInfo = Object.keys(userInfo).length > 0;
  if (hasUserInfo) {
    return (
      <div stype={{ marginTop: 100 }}>
        <div
          className="row"
          style={{
            margin: "auto",
            padding: 15,
            maxWidth: 450,
            alignContent: "center",
          }}
        >
          <p className="col-md-12 fs-3">User Detail</p>
          <hr />
          <p className="col-md-6 fw-bold">ID:</p>
          <p className="col-md-6">{userInfo.id}</p>
          <p className="col-md-6 fw-bold">name:</p>
          <p className="col-md-6">{userInfo.name}</p>
          <p className="col-md-6 fw-bold">email:</p>
          <p className="col-md-6">{userInfo.email}</p>
          <p className="col-md-6 fw-bold">phone:</p>
          <p className="col-md-6">{userInfo.phone}</p>
          <p className="col-md-6 fw-bold">address:</p>
          <p className="col-md-6">{userInfo.address}</p>
        </div>
        <MDBBtn onClick={() => navigate("/")} color="danger">
          Go back
        </MDBBtn>
      </div>
    );
  } else {
    console.log("in else hasUserInfo");
    return <h2>error</h2>;
  }
};

export default UserInfo;
