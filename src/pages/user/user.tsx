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
import { FormData } from "../../model/model";
import "./user.scss";

const user = () => {
  const backend_baseURL = "http://localhost/my-vite-react-server";
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogID, setDialogID] = useState(0);
  const [createForm, setCreateForm] = useState<FormData>({
    name: "",
  });

  const handleOpen = (id: number) => {
    setDialogID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formChange = (event: any) => {
    setCreateForm({
      ...createForm,
      [event.target.name]: event.target.value,
    });
  };

  const createSubmit = (event: any) => {
    event.preventDefault();
    sendFormDataToBackend(createForm);
  };

  const sendFormDataToBackend = (formData: FormData) => {
    fetch(`${backend_baseURL}/user/user_create.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleClose();
        alert("Form submitted successfully, " + data);
      })
      .catch((error) => {
        alert("Error submitting form, " + error);
      });
  };

  useEffect(() => {
    fetch("http://localhost/my-vite-react-server/user/user_read.php")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="page-container">
      <div className="menu-add">
        <Button
          className="menu-add-btn"
          variant="outlined"
          color="secondary"
          onClick={() => handleOpen(1)}
        >
          <PersonAddIcon />
          <span>Create user</span>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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
                    <IconButton color="success" onClick={() => handleOpen(2)}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton color="warning" onClick={() => handleOpen(3)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpen(4)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          ""
        )}
      </table>

      <Dialog
        open={open && dialogID === 1}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
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
            <div className="btn-submit">
              <Button type="submit" variant="contained">
                submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default user;
