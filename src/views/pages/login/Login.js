import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Fondo Mutual UNEFM © '}
      1995 Todos Los Derechos Reservados.{' '}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const history = useHistory()
  const [showSpinner, setShowSpinner] = useState(false)
  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      return <Redirect to="/account" />
    }
  }
    , [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setShowSpinner(true)
    const idCard = data.get('idCard')
    const password = data.get('password')
    try {
      const result = await axios.post('https://servidor-fmunefm.herokuapp.com/fmunefm/login', {
        idCard,
        password,
      })
      if (result.data.status === 202) {
        localStorage.setItem('token', result.data.data)
        return ((() => {
          history.push('/account')
          setShowSpinner(false)
        })())
      } else if (result.status === 204) {
        alert('usuario no existe')
        setShowSpinner(false)
      } else if (result.status === 400) {
        alert('Contraseña incorrecta')
        setShowSpinner(false)
      } else if (result.status === 401) {
        alert('Este usuario se encuentra en espera para ser verificado')
        setShowSpinner(false)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        hidden={!showSpinner}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          backgroundColor: 'rgba(8, 34, 49, 0.575)',
        }}
      >
        <CSpinner style={{ display: 'block' }} color="info" />
        <span style={{ display: 'block', color: '#fff' }}>...Cargando</span>
      </div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia Sesion
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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