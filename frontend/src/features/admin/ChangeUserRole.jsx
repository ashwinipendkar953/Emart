import { ROLE } from "../../config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUser } from "./adminSlice";
import { toast } from "react-toastify";

const ChangeUserRole = ({ userId, name, email, role }) => {
  const [changeRole, setChangeRole] = useState(role);
  const dispatch = useDispatch();
  const { message, isSuccess, isError } = useSelector((state) => state.admin);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
      fetchAllUsers();
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
  }, [dispatch, message, isSuccess, isError]);

  const handleChangeRole = () => {
    const updatedUserData = {
      userId,
      name,
      email,
      role: changeRole,
    };

    dispatch(updateUser(updatedUserData));
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      style={{marginTop: "5rem"}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="staticBackdropLabel">
              Change User Role
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <div className="d-flex align-items-center justify-content-start">
              <p className="p-0 m-0">Role:</p>
              <select
                className="form-select pt-0 mt-0 ms-2"
                style={{ width: "300px" }}
                onChange={(e) => setChangeRole(e.target.value)}
                value={changeRole}
              >
                <option value="">Select Role</option>
                {Object.values(ROLE).map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => handleChangeRole()}
            >
              Change Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
