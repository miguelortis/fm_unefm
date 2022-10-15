import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VerifiedIcon from '@mui/icons-material/Verified';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {NumericFormat} from 'react-number-format'
import { useDispatch } from 'react-redux';
import { TYPES } from 'src/actions/loadingAction';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import message from 'src/components/commons/message';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      ©
      <Link color="inherit" href="/">
      {' Fondo Mutual UNEFM '}
      </Link>{' '}
      1995 - {new Date().getFullYear()} Todos Los Derechos Reservados.
    </Typography>
  );
}

const theme = createTheme();

export default function RenewalPage() {
  const [foreign, setForeign] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const materialUITextFieldProps = {
    margin:"normal",
    fullWidth: true,
    id:"idCard",
    label:"Cedula",
    name:"idCard",
    autoComplete:"idCard",
    autoFocus: true,
    InputLabelProps:{style: {background: '#fff', padding: '0 10px'}},
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch({ type: TYPES.SHOW_LOADING, payload: true })
    const idCard = data.get('idCard')
    try {
      const result = await axios.post(`${process.env.REACT_APP_RENEWAL_TEST_URL}/auth/login`, {
        idCard,
      })
      return console.log(result)
      if (result.data.status === 200) {
        localStorage.setItem('token', result.data.token)
        dispatch({ type: TYPES.SHOW_LOADING, payload: false })
        history.push('/account')
        return
      } else {
        message.error(result.data.message)
        dispatch({ type: TYPES.SHOW_LOADING, payload: false })
      }
    } catch (error) {
      console.log(error)
      message.error('Ocurrio un poroblema con el servidor')
      dispatch({ type: TYPES.SHOW_LOADING, payload: false })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <VerifiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verificar Datos
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControlLabel
                control={<Checkbox onChange={(e)=> setForeign(e.target.checked)} color="primary" />}
                label="Extranjero"
            />
            <NumericFormat 
              placeholder={foreign ? 'E- 19.952.022' : 'V- 19.952.022'}
              allowNegative={false}
              customInput={TextField} 
              prefix={foreign ? 'E- ' : 'V- '}
              decimalSeparator=","
              thousandsGroupStyle="mil"
              thousandSeparator="."
              decimalScale={0}
              onValueChange={(values, sourceInfo) => {
                console.log(values, sourceInfo);
              }}
              {...materialUITextFieldProps}
              />
            {/* <TextField
              margin="normal"
              fullWidth
              id="idCard"
              label="Cedula"
              name="idCard"
              autoComplete="idCard"
              autoFocus
              InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}