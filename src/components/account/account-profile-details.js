import React, { useContext } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  styled,
  Divider,
  Grid,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { Context } from "src/contexts/Context";
import "./style.css";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "src/redux/actions/userActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const AccountProfileDetails = (props) => {
  const dispatch = useDispatch();
  const { loadingUserInfo, successUserInfo, currentUser } = useSelector(
    (state) => state.user
  );
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submit = () => {
    console.log(values);
    dispatch(userUpdate(values));
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Item>
        <Typography color="textSecondary" gutterBottom variant="h5">
          Informacion Personal
        </Typography>
        <Divider />
        <Grid container spacing={3} sx={{ mt: 0, mb: 2 }}>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="email">
              Correo
            </InputLabel>
            {/*<FormHelperText id="my-helper-text">Well never share your email.</FormHelperText> */}

            <TextField
              id="email"
              fullWidth
              name="email"
              onChange={handleChange}
              required
              defaultValue={currentUser?.email.toLowerCase()}
              variant="outlined"
              size="small"
              className="profile-inputs"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="phone">
              Telefono
            </InputLabel>
            {/*<FormHelperText id="my-helper-text">Well never share your email.</FormHelperText> */}

            <TextField
              id="phone"
              fullWidth
              name="phone"
              onChange={handleChange}
              required
              defaultValue={currentUser?.user?.phone}
              variant="outlined"
              size="small"
              className="profile-inputs"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Direccion de Habitacion
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={currentUser?.address}
              variant="outlined"
              size="small"
              className="profile-inputs"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Fecha de Registro
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={DateTime.fromISO(
                currentUser?.user?.createdAt
              ).toFormat("dd-MM-yyyy")}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="dateBirth">
              Fecha de Nacimiento
            </InputLabel>

            <TextField
              id="dateBirth"
              fullWidth
              name="dateBirth"
              onChange={handleChange}
              required
              defaultValue={DateTime.fromISO(
                currentUser?.user?.dateBirth
              ).toFormat("dd-MM-yyyy")}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="placeBirth">
              Lugar de nacimiento
            </InputLabel>
            {/*<FormHelperText id="my-helper-text">Well never share your email.</FormHelperText> */}

            <TextField
              id="placeBirth"
              fullWidth
              name="placeBirth"
              onChange={handleChange}
              required
              defaultValue={currentUser?.user?.placeBirth}
              variant="outlined"
              size="small"
              className="profile-inputs"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Tipo de género
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={currentUser?.user?.gender}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Estado civil
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={currentUser?.civilStatus}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Tipo de personal
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={currentUser?.personalType}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className="profile-input-label" htmlFor="address">
              Categoria
            </InputLabel>

            <TextField
              id="address"
              fullWidth
              name="address"
              onChange={handleChange}
              required
              defaultValue={currentUser?.category}
              variant="outlined"
              size="small"
              className="profile-inputs"
              disabled
            />
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={submit}>
            Guardar
          </Button>
        </Box>
      </Item>
    </form>
  );
};
