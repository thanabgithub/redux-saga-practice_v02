import React, { useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersStart, deleteUserStart } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";
const iconWidth = 20;
const timeoutInterval = 1000;
const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.dataUsers);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  const handleDelete = (itemId) => {
    if (
      !isLoading &&
      window.confirm("Are you sure that you would like to delete that user?")
    ) {
      dispatch(deleteUserStart(itemId));
      toast.info("deleting users");
      setTimeout(() => dispatch(loadUsersStart()), timeoutInterval);
    }
  };
  return (
    <div className="container" style={{ marginTop: 150 }}>
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
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((item, index) => (
            <MDBTableBody key={index}>
              <tr>
                <th scope="row" style={{ lineHeight: 2 }}>
                  {item.id}
                </th>
                <td style={{ lineHeight: 2 }}>{item.name}</td>
                <td style={{ lineHeight: 2 }}>{item.email}</td>
                <td style={{ lineHeight: 2 }}>{item.phone}</td>
                <td style={{ lineHeight: 2 }}>{item.address}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: 0 }}
                  >
                    <MDBTooltip title="Delete" tag="a" style={{ padding: 0 }}>
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "red", width: iconWidth, padding: 0 }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>
                  <NavLink
                    to={`/editUser/${users.id}`}
                    className="nav-link text-white"
                    style={{ padding: 0 }}
                  >
                    <MDBTooltip title="edit" tag="a" style={{ padding: 0 }}>
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{ color: "green", width: iconWidth, padding: 0 }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </NavLink>
                  <NavLink
                    to={`/userinfo/${users.id}`}
                    className="nav-link text-white"
                    style={{ padding: 0 }}
                  >
                    <MDBTooltip title="view" tag="a" style={{ padding: 0 }}>
                      <MDBIcon
                        fas
                        icon="eye"
                        style={{ color: "blue", width: iconWidth, padding: 0 }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </NavLink>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
};

export default Home;
