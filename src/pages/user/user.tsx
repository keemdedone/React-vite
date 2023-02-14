import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ToggleOffRoundedIcon from "@mui/icons-material/ToggleOffRounded";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { FormData } from "../../model/model";
import "./user.scss";

const user = () => {
  let dialogContent;
  const backend_url = "http://localhost/my-vite-react-server";
  const [userID, setUserID] = useState<number>();
  const [user, setUser] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean[]>([]);
  const [dialogID, setDialogID] = useState<number>(0);
  const [createForm, setCreateForm] = useState<FormData>({
    name: "",
    email: "",
    photo: null,
  });
  const [updateForm, setUpdateForm] = useState<FormData>({
    name: "",
    email: "",
    photo: null,
  });

  const onOpenCreateDialog = (action: number) => {
    setDialogID(action);
    setOpen(true);
  };

  const onOpenReadDialog = (action: number, id: number) => {
    setDialogID(action);
    getUser(id);
    setOpen(true);
  };

  const onOpenUpdateDialog = (action: number, id: number) => {
    getUser(id);
    if (user) {
      setDialogID(action);
      setOpen(true);
      setUserID(id);
    }
  };

  const onCloseDialog = () => {
    setOpen(false);
  };

  const getUsers = () => {
    fetch(`${backend_url}/users/users_read.php`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setStatus(data.map((d: any) => d.uActive === "1"));
      });
  };

  const getUser = (id: number) => {
    fetch(`${backend_url}/users/users_readSingle.php?uID=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  const formChange = (event: any) => {
    setCreateForm({
      ...createForm,
      [event.target.name]: event.target.value,
    });
  };

  const createSubmit = (event: any) => {
    event.preventDefault();
    createSend(createForm);
  };

  const createSend = (formData: FormData) => {
    fetch(`${backend_url}/users/users_create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onCloseDialog();
        getUsers();
        console.log("Form submitted successfully, " + data);
      })
      .catch((error) => {
        console.error("Error submitting form, " + error);
      });
  };

  const updateChange = (event: any) => {
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value,
    });
  };

  const updateSubmit = (event: any) => {
    event.preventDefault();
    updateSend(updateForm);
  };

  const updateSend = (formData: FormData) => {
    fetch(`${backend_url}/users/users_update.php?uID=${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        onCloseDialog();
        getUsers();
        console.log("Form updated successfully, " + data);
      })
      .catch((error) => {
        console.error("Error updated form, " + error);
      });
  };

  switch (dialogID) {
    case 1:
      dialogContent = (
        <div className="dialog-component">
          <h1>Create</h1>
          <form onSubmit={createSubmit} onChange={formChange}>
            <div className="box">
              <TextField
                id="filled-basic"
                label="User name"
                name="name"
                variant="filled"
                autoComplete="off"
                focused
                required
              />
            </div>
            <div className="box">
              <TextField
                id="filled-basic"
                label="Email"
                name="email"
                variant="filled"
                autoComplete="off"
                focused
                required
              />
            </div>
            <div className="box">
              <div
                className="upload"
                onClick={() => {
                  (document.querySelector(
                    "#photo"
                  ) as HTMLInputElement)!.click();
                }}
              >
                <CameraAltIcon className="icon" />
              </div>
              <input type="file" name="photo" id="photo" hidden />
            </div>
            <div className="btn-submit">
              <Button type="submit" variant="contained">
                <SaveIcon />
              </Button>
              <Button
                type="button"
                color="error"
                variant="contained"
                onClick={onCloseDialog}
              >
                <CloseIcon />
              </Button>
            </div>
          </form>
        </div>
      );
      break;

    case 2:
      dialogContent = (
        <div className="dialog-component">
          <h1>User Information</h1>
          {user.map((data: any, index: number) => (
            <div key={index} className="user-info">
              <p>
                <b>Name</b>
                <b>:</b>
                <span>{data.uName}</span>
              </p>
              <p>
                <b>Email</b>
                <b>:</b>
                <span>{data.uEmail}</span>
              </p>
              <p>
                <b>Status</b>
                <b>:</b>
                <span>{data.uActive === "0" ? "Active" : "Disabled"}</span>
              </p>
            </div>
          ))}
        </div>
      );
      break;

    case 3:
      dialogContent = (
        <div className="dialog-component">
          <h1>Update</h1>
          {user ? (
            <form onSubmit={updateSubmit} onChange={updateChange}>
              <div className="box">
                <TextField
                  id="filled-basic"
                  label="User name"
                  name="name"
                  variant="filled"
                  autoComplete="off"
                  focused
                  required
                />
              </div>
              <div className="box">
                <TextField
                  id="filled-basic"
                  label="Email"
                  name="email"
                  variant="filled"
                  autoComplete="off"
                  focused
                  required
                />
              </div>
              <div className="box">
                <div
                  className="upload"
                  onClick={() => {
                    (document.querySelector(
                      "#photo"
                    ) as HTMLInputElement)!.click();
                  }}
                >
                  <CameraAltIcon className="icon" />
                </div>
                <input type="file" name="photo" id="photo" hidden />
              </div>
              <div className="btn-submit">
                <Button type="submit" variant="contained">
                  <SaveIcon />
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  onClick={onCloseDialog}
                >
                  <CloseIcon />
                </Button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      );
      break;

    default:
      break;
  }

  const changeActive = (index: number, userID: number) => {
    fetch(`${backend_url}/users/users_updateStatus.php?uID=${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: status[index] ? 0 : 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "complete") {
          setTimeout(() => {
            setStatus((prevStatus) => {
              const newStatus = [...prevStatus];
              newStatus[index] = !newStatus[index];
              return newStatus;
            });
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Error updated form, " + error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="page-container">
      <div className="menu-add">
        <Button
          className="menu-add-btn"
          variant="contained"
          onClick={() => onOpenCreateDialog(1)}
        >
          <PersonAddIcon />
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Menu</th>
          </tr>
        </thead>
        {users.length > 0 ? (
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={index}>
                <td>{user.uID}</td>
                <td>{user.uName}</td>
                <td>{user.uEmail}</td>
                <td>
                  <div className="active">
                    <Button
                      className={
                        !status[index] ? "active-btn" : "active-btn toggle"
                      }
                      color="primary"
                      variant="contained"
                      onClick={() => changeActive(index, user.uID)}
                    >
                      {status[index] ? (
                        <ToggleOnOutlinedIcon />
                      ) : (
                        <ToggleOffRoundedIcon />
                      )}
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="menu">
                    <Button
                      variant="contained"
                      className="menu-btn"
                      disabled={status[index]}
                      onClick={() => onOpenReadDialog(2, user.uID)}
                    >
                      <SearchIcon />
                    </Button>
                    <Button
                      variant="contained"
                      className="menu-btn"
                      disabled={status[index]}
                      onClick={() => onOpenUpdateDialog(3, user.uID)}
                    >
                      <EditIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={5}>No user information.</td>
            </tr>
          </tbody>
        )}
      </table>

      <Dialog
        open={open}
        onClose={onCloseDialog}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          style: {
            background: "#2c3e50",
          },
        }}
      >
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default user;
