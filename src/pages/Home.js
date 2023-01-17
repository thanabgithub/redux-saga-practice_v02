import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsersStart,
  deleteUserStart,
  filterUserStart,
} from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";
const iconWidth = 20;
const timeoutInterval = 1000;
const Home = React.memo((props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.dataUsers);

  useEffect(() => {
    if (filterValue === "") {
      dispatch(loadUsersStart());
    } else {
      dispatch(filterUserStart(filterValue));
    }
  }, [dispatch, filterValue]);

  useEffect(() => {
    console.log(isLoading, isDeleting);

    isLoading & !filterValue & !isDeleting && toast.info("Loading");
  }, [isLoading, isDeleting]);

  useEffect(() => {
    isDeleting && toast.info("Deleting");
  }, [isDeleting]);

  useEffect(() => {
    // if (filterValue != "") toast.info("filtering");

    filterValue && toast.info("filtering");
  }, [filterValue]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleDelete = (itemId) => {
    if (
      !isLoading &&
      !isDeleting &&
      window.confirm("Are you sure that you would like to delete that user?")
    ) {
      setIsDeleting(true);
      dispatch(deleteUserStart(itemId));

      setTimeout(() => {
        dispatch(loadUsersStart());
        setIsDeleting(false);
      }, timeoutInterval);
    }
  };

  const onFilterChange = (filterInput) => {
    !isLoading &&
      setFilterValue((prev) => {
        return prev !== filterInput ? filterInput : "";
      });
  };

  return (
    <div className="container" style={{ marginTop: 150 }}>
      {isLoading ? (
        <MDBSpinner />
      ) : (
        <MDBContainer>
          <MDBRow style={{ marginBottom: 20 }}>
            <MDBCol>Sort By</MDBCol>
            <MDBCol>
              Filter By Status{" "}
              <MDBBtnGroup>
                <MDBBtn
                  color="success"
                  style={{
                    color: filterValue === "active" ? "black" : "white",
                  }}
                  onClick={() => onFilterChange("active")}
                >
                  active
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  style={{
                    color: filterValue === "inactive" ? "black" : "white",
                  }}
                  onClick={() => onFilterChange("inactive")}
                >
                  inactive
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
          </MDBRow>
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
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
                    <td style={{ lineHeight: 2 }}>{item.status}</td>
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
                        <MDBTooltip
                          title="Delete"
                          tag="a"
                          style={{ padding: 0 }}
                        >
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{
                              color: "red",
                              width: iconWidth,
                              padding: 0,
                            }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>
                      <NavLink
                        to={`/editUser/${item.id}`}
                        className="nav-link text-white"
                        style={{ padding: 0 }}
                      >
                        <MDBTooltip title="edit" tag="a" style={{ padding: 0 }}>
                          <MDBIcon
                            fas
                            icon="pen"
                            style={{
                              color: "green",
                              width: iconWidth,
                              padding: 0,
                            }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </NavLink>
                      <NavLink
                        to={`/userinfo/${item.id}`}
                        className="nav-link text-white"
                        style={{ padding: 0 }}
                      >
                        <MDBTooltip title="view" tag="a" style={{ padding: 0 }}>
                          <MDBIcon
                            fas
                            icon="eye"
                            style={{
                              color: "blue",
                              width: iconWidth,
                              padding: 0,
                            }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </NavLink>
                    </td>
                  </tr>
                </MDBTableBody>
              ))}
          </MDBTable>
        </MDBContainer>
      )}
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
    </div>
  );
});

export default Home;
