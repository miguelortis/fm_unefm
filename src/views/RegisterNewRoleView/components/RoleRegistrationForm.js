import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import _nav from "src/_nav";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerRoler } from "src/redux/actions/roleActions";
import message from "src/components/commons/message";
import { showModal } from "src/redux/actions/modalActions";
import { ROLE_REGISTER_RESET } from "src/redux/constants/roleConstants";
import Loading from "src/components/commons/Loading";

export default function RoleRegistrationForm() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([0]);
  const [roleInfo, setRoleInfo] = useState({ name: "", options: [] });

  const {
    loadingRoleRegister,
    successRoleRegister,
    roleRegister,
    errorRoleRegister,
  } = useSelector((state) => state.registeredRoleData);

  useEffect(() => {
    if (errorRoleRegister) {
      message.error(errorRoleRegister);
    }
    if (successRoleRegister) {
      message.success(
        <span>
          Rol <b>{roleInfo.name}</b> registrado con éxito
        </span>
      );
      dispatch(showModal());
    }
    setLoading(false);
    return () => {
      dispatch({ type: ROLE_REGISTER_RESET });
    };
  }, [successRoleRegister, errorRoleRegister]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const options = [];
    newChecked.forEach((item) => {
      item.code && options.push(item.code);
    });
    setRoleInfo({ ...roleInfo, options: options });
    setChecked(newChecked);
  };
  const handleRoleRegister = () => {
    if (roleInfo.name === "") {
      return message.error("Debe asignar un nombre");
    }
    if (roleInfo.options.length === 0) {
      return message.error("Debe Seleccionar como minimo una opcion");
    }
    setLoading(true);
    dispatch(registerRoler(roleInfo));
  };
  return (
    <>
      <TextField
        sx={{ mt: 2, ml: 2 }}
        id="name"
        label="Nombre del Rol"
        variant="outlined"
        InputLabelProps={{ style: { background: "white", padding: "0 10px" } }}
        onChange={(e) => setRoleInfo({ ...roleInfo, name: e.target.value })}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: { xs: 300, sm: 450, md: 700 },
          bgcolor: "background.paper",
        }}
      >
        <Grid container>
          {_nav.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <Grid item xs={12} sm={6} md={4} key={value.code + value.name}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.name} />
                  </ListItemButton>
                </ListItem>
              </Grid>
            );
          })}
        </Grid>
      </List>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button variant="contained" onClick={handleRoleRegister}>
          Guardar
        </Button>
      </Box>
      {loading && <Loading />}
    </>
  );
}
