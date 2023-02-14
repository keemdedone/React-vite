import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { FormData } from "../../model/model";
import "./user.scss";

const user = () => {
  let dialogContent;
  const backend_url = "http://localhost/my-vite-react-server";
  const [user, setUser] = useState<any>([]);
  const [userID, setUserID] = useState<number>();
  const [users, setUsers] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [dialogID, setDialogID] = useState(0);
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

  const onOpenDeleteDialog = (action: number, id: number) => {
    setDialogID(action);
    setOpen(true);
  };

  const onCloseDialog = () => {
    setOpen(false);
  };

  const getUser = (id: number) => {
    fetch(`${backend_url}/users/users_readSingle.php?uID=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  };

  const getUsers = () => {
    fetch(`${backend_url}/users/users_read.php`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  const formChange = (event: any) => {
    setCreateForm({
      ...createForm,
      [event.target.name]: event.target.value,
    });
  };

  const updateChange = (event: any) => {
    setUpdateForm({
      ...updateForm,
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
              <Button type="submit" variant="outlined">
                create
              </Button>
              <Button
                type="button"
                color="error"
                variant="outlined"
                onClick={onCloseDialog}
              >
                close
              </Button>
            </div>
          </form>
        </div>
      );
      break;

    case 2:
      dialogContent = (
        <div className="dialog-component">
          <h1>Read</h1>
          {user.map((data: any, index: number) => (
            <div key={index} className="user-info">
              <p>
                <b>Name</b>
                <span>{data.uName}</span>
              </p>
              <p>
                <b>Email</b>
                <span>{data.uEmail}</span>
              </p>
              <p>
                <b>Status</b>
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
                <Button type="submit" variant="outlined">
                  save
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  onClick={onCloseDialog}
                >
                  close
                </Button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      );
      break;

    case 4:
      dialogContent = (
        <div className="dialog-component">
          <h1>Remove</h1>
        </div>
      );
      break;

    default:
      break;
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="page-container">
      <div className="menu-add">
        <Button
          className="menu-add-btn"
          variant="outlined"
          color="secondary"
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
                      className="active-btn"
                      variant="outlined"
                      color="primary"
                    >
                      <EditAttributesIcon />
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="menu">
                    <IconButton
                      color="success"
                      onClick={() => onOpenReadDialog(2, user.uID)}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => onOpenUpdateDialog(3, user.uID)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onOpenDeleteDialog(4, user.uID)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
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
      >
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default user;
