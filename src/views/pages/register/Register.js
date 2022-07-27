
import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
//import PropTypes from 'prop-types'
import { CCol, CContainer, CRow } from '@coreui/react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { DesktopDatePicker } from '@mui/lab'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import {
  Alert,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material'
import AffiliationContract from 'src/views/affiliationcontract/AffiliationContract'
import TermsAndConditions from 'src/views/termsAndConditions/TermsAndConditions'
const initialValues = {
  documentType: '',
  idCard: '',
  password: '',
  name: '',
  lastName: '',
  direction: '',
  dateBirth: '',
  placeBirth: '',
  email: '',
  phone: '',
  sex: '',
  civilStatus: '',
  category: '',
  personalType: '',
}
const Register = () => {
  const history = useHistory()
  const [newUser, setNewUser] = useState(initialValues)
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')

  if (!!localStorage.getItem('token')) {
    return <Redirect to="/account" />
  }

  // const res = 'PEDRO'
  // console.log(res.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()))
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = (e) => {
    console.log(newUser)
    e.preventDefault()
    setShowSpinner(true)
    if (
      newUser.name == null ||
      newUser.dateBirth == null ||
      newUser.category == null ||
      newUser.civilStatus == null ||
      newUser.direction == null ||
      newUser.documentType == null ||
      newUser.email == null ||
      newUser.idCard == null ||
      newUser.lastName == null ||
      newUser.sex == null ||
      newUser.password == null ||
      newUser.personalType == null ||
      newUser.phone == null ||
      newUser.placeBirth == null ||
      newUser.RegistrationDateUnefm == null
    ) {
      setError('Completa todos los campos por favor')
      setShowError(true)
      setShowSpinner(false)
    } else {
      if (!passwordConfirm) {
        setError('la contraseña de confirmacion no coincide')
        setShowError(true)
        setShowSpinner(false)
      } else {

        axios
          .post(`${process.env.REACT_APP_TEST_URL}/auth/register`, newUser)
          .then((res) => {
            console.log(res)
            console.log(res.data.messaje)

            if (res.data.status === 201) {
              setNewUser(initialValues)
              document.getElementById('Form').reset()
              setShowSpinner(false)
              history.push('/login')
            }

            if (res.data.status === 400) {
              setError(res.data.error)
              setShowError(true)
              setShowSpinner(false)
            }
          })
          .catch((err) => { })
      }
    }
  }

  const handleCloseError = () => {
    setShowError(false)
  }

  const steps = ['Datos (inicio Sesion)', 'Datos (Personales)', 'Finalizar Registro']
  // const isStepOptional = (step) => {
  //   return step === 1
  // }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCancel = () => {
    setNewUser({ initialValues })
    history.push('/login')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
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
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showError}
          onClose={handleCloseError}
        //message={error}
        //key={'topcenter'}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={10} xl={10}>
            <Card sx={{ minWidth: 275 }}>
              <h3 style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
                Suscripcion
              </h3>

              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {}
                      const labelProps = {}
                      // if (isStepOptional(index)) {
                      //   labelProps.optional = <Typography variant="caption">Optional</Typography>
                      // }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      )
                    })}
                  </Stepper>

                  <Fragment>
                    <br />
                    <Divider></Divider>
                    <br />

                    <Box
                      component="form"
                      id="Form"
                      sx={{
                        '& > :not(style)': { m: 1 },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {/* ///////////////////////STEP  1////////////////////////////// */}
                      {activeStep === 0 && (
                        <div style={{ display: 'flex', textAlign: 'center' }}>
                          <Grid
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                          >
                            {/* /////////CEDULA//////////// */}
                            <Grid item xs={4} sm={8} md={12}>
                              <FormControl variant="standard" sx={{ minWidth: 50 }}>
                                <InputLabel htmlFor="documentType">Tipo</InputLabel>
                                <Select
                                  required
                                  name="documentType"
                                  id="documentType"
                                  value={newUser.documentType}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, documentType: e.target.value })
                                  }}
                                  aria-label="Default select example"
                                // value={age}
                                // onChange={handleChange}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="V">V</MenuItem>
                                  <MenuItem value="E">E</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl variant="standard">
                                <InputLabel htmlFor="idCard">Cedula</InputLabel>
                                <Input
                                  required
                                  name="idCard"
                                  id="idCard"
                                  type="number"
                                  value={newUser.idCard}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      idCard: e.target.value.replace(/\./g, ''),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Ej. 11001045)
                                </div>
                              </FormControl>
                            </Grid>
                            {/* ///////////////PASSWORD//////////////// */}
                            <Grid item xs={4} sm={8} md={12}>
                              <FormControl sx={{ width: '28ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                  Contraseña
                                </InputLabel>
                                <Input
                                  required
                                  id="standard-adornment-password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={newUser.password}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, password: e.target.value })
                                  }}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Debe ser mayor a 8 digitos)
                                </div>
                              </FormControl>
                            </Grid>

                            <Grid item xs={4} sm={8} md={12}>
                              <FormControl sx={{ width: '28ch' }} variant="standard">
                                <InputLabel htmlFor="new-password">Confirmar Contraseña</InputLabel>
                                <Input
                                  required
                                  onChange={(e) => {
                                    e.target.value === newUser.password
                                      ? setPasswordConfirm(true)
                                      : setPasswordConfirm(false)
                                  }}
                                  type={showPassword ? 'text' : 'password'}
                                  name="new-password"
                                  id="new-password"
                                />
                              </FormControl>
                              {passwordConfirm === false && (
                                <div style={{ color: 'red' }}>no coincide con la contraseña</div>
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      )}

                      {/* ///////////////////////STEP 2 ////////////////////////////// */}
                      {activeStep === 1 && (
                        <div style={{ display: 'flex', textAlign: 'center' }}>
                          <Grid
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }}
                          >
                            {/* ///////////NAME//////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="name">Nombres</InputLabel>
                                <Input
                                  required
                                  name="name"
                                  id="name"
                                  value={newUser.name}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, name: e.target.value.toUpperCase() })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Primer y segundo nombre)
                                </div>
                              </FormControl>
                            </Grid>
                            {/* /////////////LASTNAME/////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="lastName">Apellidos</InputLabel>
                                <Input
                                  required
                                  id="lastName"
                                  value={newUser.lastName}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      lastName: e.target.value.toUpperCase(),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Primer y segundo apellido)
                                </div>
                              </FormControl>
                            </Grid>
                            {/*/////////////////////EMAIL//////////////////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="email">Correo</InputLabel>
                                <Input
                                  required
                                  pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
                                  name="email"
                                  id="email"
                                  value={newUser.email}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      email: e.target.value.toUpperCase(),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Ej. SOPORTEFMUNEFM@GMAIL.COM)
                                </div>
                              </FormControl>
                            </Grid>
                            {/*///////////////DATEBIRTH//////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <DesktopDatePicker
                                  id="dateBirth"
                                  label="Fecha de Nacimiento"
                                  inputFormat="DD/MM/YYYY"
                                  renderInput={(params) => (
                                    <TextField {...params} variant="standard" />
                                  )}
                                  name="dateBirth"
                                  value={newUser.dateBirth}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, dateBirth: e })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (DD/MM/YYYY)
                                </div>
                              </FormControl>
                            </Grid>
                            {/*///////////////RegistrationDateUnefm//////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <DesktopDatePicker
                                  id="RegistrationDateUnefm"
                                  label="Fecha de ingreso a la universidad"
                                  inputFormat="DD/MM/YYYY"
                                  renderInput={(params) => (
                                    <TextField {...params} variant="standard" />
                                  )}
                                  name="RegistrationDateUnefm"
                                  value={newUser.RegistrationDateUnefm}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, RegistrationDateUnefm: e })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (DD/MM/YYYY)
                                </div>
                              </FormControl>
                            </Grid>
                            {/* ////////////////PLACEBIRT////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="placeBirth">Lugar de Nacimiento</InputLabel>
                                <Input
                                  required
                                  id="placeBirth"
                                  value={newUser.placeBirth}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      placeBirth: e.target.value.toUpperCase(),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Ciudad Ej. Coro, Edo. Falcón)
                                </div>
                              </FormControl>
                            </Grid>
                            {/*//////////////////DIRECTION///////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="direction">Direccion de Habitacion</InputLabel>
                                <Input
                                  type="textarea"
                                  rows=" 1 "
                                  required
                                  id="direction"
                                  value={newUser.direction}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      direction: e.target.value.toUpperCase(),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Ej. Calle 25 Estadio entre Av. Independencia y Calle Garces)
                                </div>
                              </FormControl>
                            </Grid>
                            {/*///////TELEFONO////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="phone">Telefono</InputLabel>
                                <Input
                                  type="number"
                                  required
                                  id="phone"
                                  value={newUser.phone}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      phone: e.target.value.toUpperCase(),
                                    })
                                  }}
                                />
                                <div style={{ color: '#767982', fontSize: '11px' }}>
                                  (Ej. 04246092184)
                                </div>
                              </FormControl>
                            </Grid>
                            {/* ///////////////////SEX///////////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="sex">Sexo</InputLabel>
                                <Select
                                  required
                                  name="sex"
                                  id="sex"
                                  value={newUser.sex}
                                  onChange={(e) => {
                                    setNewUser({ ...newUser, sex: e.target.value })
                                  }}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="MASCULINO">Masculino</MenuItem>
                                  <MenuItem value="FEMENINO">Femenino</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* ///////////////////CIVIL STATUS///////////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="civilStatus">Estado Civil</InputLabel>
                                <Select
                                  required
                                  name="civilStatus"
                                  id="civilStatus"
                                  value={newUser.civilStatus}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      civilStatus: e.target.value,
                                    })
                                  }}
                                  aria-label="Default select example"
                                // value={age}
                                // onChange={handleChange}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="SOLTERO">Soltero/a</MenuItem>
                                  <MenuItem value="CASADO">Casado/a</MenuItem>
                                  <MenuItem value="DIVORCIADO">Divorciado/a</MenuItem>
                                  <MenuItem value="VIUDO">Viudo/a</MenuItem>
                                  <MenuItem value="OTRO">Otro</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* ///////////////////CATEGORY///////////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="category">Categoria</InputLabel>
                                <Select
                                  required
                                  name="category"
                                  id="category"
                                  value={newUser.category}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      category: e.target.value,
                                    })
                                  }}
                                  aria-label="Default select example"
                                // value={age}
                                // onChange={handleChange}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="DOCENTE">Docente</MenuItem>
                                  <MenuItem value="ADMINISTRATIVO">Administrativo</MenuItem>
                                  <MenuItem value="OBRERO">Obrero</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* ///////////////////PERSONAL TYPE///////////////////// */}
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                              <FormControl sx={{ width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="personalType">Tipo de Personal</InputLabel>
                                <Select
                                  required
                                  name="personalType"
                                  id="personalType"
                                  value={newUser.personalType}
                                  onChange={(e) => {
                                    setNewUser({
                                      ...newUser,
                                      personalType: e.target.value,
                                    })
                                  }}
                                  aria-label="Default select example"
                                // value={age}
                                // onChange={handleChange}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="FIJO">Fijo</MenuItem>
                                  <MenuItem value="CONTRATADO">Contratado</MenuItem>
                                  <MenuItem value="JUBILADO">Jubilado</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                      {/* ///////////////////////STEP 3///////////////////// */}
                      {activeStep === 2 && (
                        <>
                          <AffiliationContract />
                          <TermsAndConditions checked={checked} setChecked={setChecked} />
                        </>
                      )}
                      <br />
                      <Divider></Divider>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button color="inherit" onClick={handleCancel} sx={{ mr: 1 }}>
                          Iniciar Sesion
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                          <Button disabled={!checked} onClick={handleSubmit}>
                            Registrar Datos
                          </Button>
                        ) : (
                          <Button
                            disabled={
                              activeStep === 0
                                ? passwordConfirm &&
                                  newUser.documentType &&
                                  newUser.idCard &&
                                  newUser.password &&
                                  passwordConfirm === true
                                  ? false
                                  : true
                                : activeStep === 1
                                  ? newUser.name &&
                                    newUser.lastName &&
                                    newUser.email &&
                                    newUser.dateBirth &&
                                    newUser.placeBirth &&
                                    newUser.direction &&
                                    newUser.phone &&
                                    newUser.sex &&
                                    newUser.civilStatus &&
                                    newUser.category &&
                                    newUser.personalType
                                    ? false
                                    : true
                                  : true
                            }
                            onClick={handleNext}
                          >
                            Siguiente
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Fragment>
                </Box>
              </CardContent>
            </Card>
            <br />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
