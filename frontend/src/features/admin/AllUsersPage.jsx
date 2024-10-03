import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "./adminSlice";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "./ChangeUserRole";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.admin.allUsers);
  const { message, isError } = useSelector((state) => state.admin);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  return (
    <div className="table-responsive user-table">
      <table className="table table-bordered table-hover w-100 bg-white d-none d-md-table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Created Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <button
                  className="bg-lightgreen p-2 rounded-circle btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setSelectedUser(user)}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive layout for small screens */}
      <div className="d-md-none">
        <div className="row">
          {allUsers?.map((user, index) => (
            <div key={index} className="col-md-6 col-12 p-2 mx-2">
              <div className="card bg-white p-3">
                <p>
                  <strong>Sr: </strong> {index + 1}
                </p>
                <p>
                  <strong>Name: </strong> {user?.name}
                </p>
                <p>
                  <strong>Email: </strong> {user?.email}
                </p>
                <p>
                  <strong>Role: </strong> {user?.role}
                </p>
                <p>
                  <strong>Date: </strong> {moment(user?.createdAt).format("LL")}
                </p>
                <button
                  className="bg-lightgreen p-2 rounded-circle btn w-25 ms-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setSelectedUser(user)}
                >
                  <MdModeEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChangeUserRole
        userId={selectedUser?._id}
        name={selectedUser?.name}
        email={selectedUser?.email}
        role={selectedUser?.role}
      />
    </div>
  );
};

export default AllUsers;
