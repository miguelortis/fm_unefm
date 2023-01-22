import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoleList } from "src/redux/actions/roleActions";
import { ROLE_LIST_RESET } from "src/redux/constants/roleConstants";
import PropTypes from "prop-types";
import { userUpdate } from "src/redux/actions/userActions";
import message from "src/components/commons/message";
import { showModal } from "src/redux/actions/modalActions";
import { USER_UPDATE_RESET } from "src/redux/constants/userConstants";

export default function RoleList({ userInfo, setUsers, setLoading }) {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [roleSelected, setRoleSelected] = useState({});
  const [list, setlist] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event, values) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setRoleSelected(values);
  };

  const { loadingRoleList, successRoleList, roleList } = useSelector(
    (state) => state.roleList
  );
  const {
    loadingUserUpdate,
    successUserUpdate,
    updatedUserData,
    errorUserUpdate,
  } = useSelector((state) => state.updatedUserData);

  useEffect(() => {
    dispatch(getRoleList());
    return () => {
      dispatch({ type: ROLE_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (search !== "") {
      const rolesArray = roles.filter(
        (item) => search.toLowerCase() === item.name.toLowerCase()
      );
      setlist(rolesArray);
    } else if (successRoleList) {
      setlist(roleList);
      setRoles(roleList);
    }
  }, [search, successRoleList]);
  useEffect(() => {
    if (successUserUpdate) {
      setUsers((prev) => [
        ...prev.filter((user) => user._id !== updatedUserData._id),
        updatedUserData,
      ]);
      dispatch(showModal());
      message.success("Rol asignado correctamente");
    } else if (errorUserUpdate) {
      message.error(errorUserUpdate);
    }
    setLoading(false);
    return () => {
      dispatch({ type: USER_UPDATE_RESET });
    };
  }, [loadingUserUpdate]);

  const handleSelectRole = () => {
    setOpen(false);
    setLoading(true);
    dispatch(
      userUpdate({
        role: roleSelected._id,
        _id: userInfo,
      })
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Asignar rol a:{" "}
            {userInfo?.user?.name + " " + userInfo?.user?.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="search"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            options={roles}
            getOptionLabel={(option) => option.name}
            onInputChange={(e, value) => setSearch(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  style: { background: "#fff", padding: "0 10px" },
                }}
                label="Rol"
                placeholder="Buscar rol"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sx={{ minWidth: 80 }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 400,
              minHeight: 200,
              maxHeight: 200,
              bgcolor: "background.paper",
              overflowY: "auto",
              marginTop: 2,
              border: "2px solid lightgray",
              borderRadius: "6px",
            }}
          >
            {list.length > 0 &&
              list.map((value, i) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem key={i + value.name} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={(e) => handleClick(e, value)}
                      dense
                    >
                      <ListItemText id={labelId} primary={value.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
      </Grid>
      <Popper
        sx={{ zIndex: 3000 }}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom"}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>
                Esta seguro de asignar este rol?.
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ m: "5px" }}
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ m: "5px" }}
                  onClick={handleSelectRole}
                >
                  Ok
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

RoleList.propTypes = {
  userInfo: PropTypes.object,
  setUsers: PropTypes.func,
  setLoading: PropTypes.bool,
};
