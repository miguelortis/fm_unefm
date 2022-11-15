import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CSpinner } from "@coreui/react-pro";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import message from "src/components/commons/message";
import { TYPES } from "src/redux/constants/loadingAction";
import { userlogin } from "src/redux/actions/userActions";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Fondo Mutual UNEFM © "}
      1995 Todos Los Derechos Reservados.{" "}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loadingUserInfo, userInfo, successUserInfo, errorUserInfo } =
    useSelector((state) => state.userAuth);
  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      return <Redirect to="/account" />;
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch({ type: TYPES.SHOW_LOADING, payload: true });
    const idCard = data.get("idCard");
    const password = data.get("password");
    dispatch(userlogin(idCard, password));
    errorUserInfo && message.error(errorUserInfo);
    /* try {
      const result = await axios.post(
        `${process.env.REACT_APP_TEST_URL}/auth/login`,
        {
          idCard,
          password,
        }
      );
      if (result.data.status === 200) {
        localStorage.setItem("token", result.data.token);
        dispatch({ type: TYPES.SHOW_LOADING, payload: false });
        history.push("/account");
        return;
      } else {
        message.error(result.data.message);
        dispatch({ type: TYPES.SHOW_LOADING, payload: false });
      }
    } catch (error) {
      console.log(error);
      message.error("Ocurrio un poroblema con el servidor");
      dispatch({ type: TYPES.SHOW_LOADING, payload: false });
    } */
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia Sesion
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="idCard"
                label="Cedula"
                name="idCard"
                autoComplete="idCard"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Olvidaste tu Contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"¿No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
