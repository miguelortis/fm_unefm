import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { CCol, CContainer, CRow } from '@coreui/react'
//import Visibility from '@mui/icons-material/Visibility'
//import VisibilityOff from '@mui/icons-material/VisibilityOff'

import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { CSpinner } from '@coreui/react-pro'
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

const Register = () => {
  const [newUser, setNewUser] = useState({})
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [spinner, setSpinner] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [showPassword, setShowPassword] = useState(false)

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
  const handleSubmit = () => {
    setSpinner(false)
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
      newUser.placeBirth == null
    ) {
      alert('Completa todos los campos por favor')
      setSpinner(true)
    } else {
      if (!passwordConfirm) {
        setSpinner(true)
        alert('la contraseña de confirmacion no coincide')
      } else {
        // setNewUser({ ...newUser, registrationDate: new Date() })
        // console.log(newUser)

        axios
          .post('https://backend-fmunefm.herokuapp.com/fmunefm/register', newUser)
          .then((res) => {
            console.log(res)
            if (res.status === 200 || res.status === 201) {
              setNewUser({})
              document.getElementById('Form').reset()
              setSpinner(true)
              //   success()
              //   setInputDisablet(null)
            }
          })
          .catch((err) => {
            if (err) {
              console.log(err)
            }
          })
      }
    }
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
    setNewUser({})
  }
  const handleReset = () => {
    setActiveStep(0)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={10} xl={10}>
            <Card sx={{ minWidth: 275 }}>
              <div
                hidden={spinner}
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
                  {activeStep === steps.length ? (
                    <Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <br />
                      <Box
                        component="form"
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
                              <Grid item xs={4} sm={4} md={12}>
                                <FormControl variant="standard" sx={{ minWidth: 50 }}>
                                  <InputLabel id="documentType">Tipo</InputLabel>
                                  <Select
                                    required
                                    name="documentType"
                                    id="documentType"
                                    value={newUser.documentType}
                                    onChange={(e) => {
                                      setNewUser({ ...newUser, documentType: e.target.value })
                                      console.log(e.target.value)
                                    }}
                                    aria-label="Default select example"
                                    // value={age}
                                    // onChange={handleChange}
                                  >
                                    <MenuItem></MenuItem>
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
                                    value={newUser.idCard}
                                    onChange={(e) => {
                                      setNewUser({ ...newUser, idCard: e.target.value })
                                      console.log(e.target.value)
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={4} sm={4} md={12}>
                                <FormControl sx={{ width: '28ch' }} variant="standard">
                                  <InputLabel htmlFor="standard-adornment-password">
                                    Password
                                  </InputLabel>
                                  <Input
                                    required
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newUser.password}
                                    onChange={(e) => {
                                      setNewUser({ ...newUser, password: e.target.value })
                                      console.log(e.target.value)
                                    }}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? 'Hidde' : 'Show'}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} sm={4} md={12}>
                                <FormControl sx={{ width: '28ch' }}>
                                  <InputLabel htmlFor="new-password">
                                    Confirmar Contraseña
                                  </InputLabel>
                                  <Input
                                    required
                                    onChange={(e) => {
                                      e.target.value === newUser.password
                                        ? setPasswordConfirm(true)
                                        : setPasswordConfirm(false)
                                    }}
                                    type="password"
                                    name="new-password"
                                    id="new-password"
                                  />
                                </FormControl>
                                {!passwordConfirm && <div>no coincide con la contraseña</div>}
                              </Grid>
                            </Grid>
                          </div>
                        )}

                        {/* ///////////////////////STEP 2 ////////////////////////////// */}
                        {activeStep === 1 && 'Component2'}
                        {activeStep === 2 && 'Component3'}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Back
                          </Button>
                          {/* <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            Skip
                            </Button>
                            )} */}
                          <Box sx={{ flex: '1 1 auto' }} />
                          {activeStep === steps.length - 1 ? (
                            <Button onClick={handleSubmit}>Registrar Datos</Button>
                          ) : (
                            <Button
                              disabled={
                                newUser.documentType &&
                                newUser.idCard &&
                                newUser.password &&
                                passwordConfirm === true
                                  ? false
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
                  )}
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
