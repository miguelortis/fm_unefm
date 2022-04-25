import padre from '../../assets/images/avatars/padre.svg'
import madre from '../../assets/images/avatars/madre.svg'
import conyugeF from '../../assets/images/avatars/conyugeF.svg'
import conyugeM from '../../assets/images/avatars/conyugeM.svg'
import fondoCard from '../../assets/images/image.jpg'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import * as moment from 'moment'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardImageOverlay,
  CCardText,
  CCardTitle,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useState, useContext } from 'react'
import { Context } from '../../contexts/Context'
import axios from 'axios'
import { InputAdornment, TextField } from '@mui/material'
import { ContactPhone, Phone, Email, AlternateEmail } from '@mui/icons-material'
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function Profile() {
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)
  const [updateData, setUpdateData] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const fecha = moment(currentUser?.registrationDate).format('DD MMM YYYY')

  const UpdateData = async (e) => {
    e.preventDefault()
    setShowSpinner(true)

    //alert('Completa todos los Campos')
    try {
      const { data } = await axios.patch(
        'https://backend-fmunefm.vercel.app/fmunefm/modify-headline',
        updateData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      if (data.status === 403) {
        alert('Este email ya existe')
        setShowSpinner(false)
      } else {
        dispatch({
          type: 'SET_USER_DATA',
          payload: updateData,
        })
        setShowSpinner(false)
        setOpen(false)
      }
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  }

  const calcularEdad = () => {
    var hoy = new Date()
    var cumpleanos = new Date(currentUser?.dateBirth)
    var edad = hoy.getFullYear() - cumpleanos.getFullYear()
    var m = hoy.getMonth() - cumpleanos.getMonth()

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--
    }

    return edad
  }
  const edad = calcularEdad()
  return (
    <>
      <CRow>
        <CCol style={{ marginLeft: 'auto', marginRight: 'auto' }} xs={12} md={10} lg={10} xl={10}>
          <CCard>
            <CCardImage style={{ height: '10rem' }} orientation="top" src={fondoCard} />
            <CCardImageOverlay
              style={{
                textAlignLast: 'center',
                textShadow: '0.3em 0.3em 0.2em rgba(19, 21, 22, 0.575)',
              }}
            >
              <CAvatar
                src={
                  edad < 50 && currentUser?.sex === 'MASCULINO'
                    ? conyugeM
                    : edad < 50 && currentUser?.sex === 'FEMENINO'
                    ? conyugeF
                    : edad > 50 && currentUser?.sex === 'MASCULINO'
                    ? padre
                    : edad > 50 && currentUser?.sex === 'FEMENINO'
                    ? madre
                    : '??'
                }
                size="xl"
              />
              <br />

              <CCardTitle style={{ color: '#fff' }}>
                <b>
                  {currentUser?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()) +
                    ' ' +
                    currentUser?.lastName?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </b>
              </CCardTitle>
              <CCardText style={{ color: '#fff' }}>
                {currentUser?.documentType?.toUpperCase() + ' ' + currentUser?.idCard}
              </CCardText>
            </CCardImageOverlay>
            <CCardBody style={{ textAlignLast: 'center' }}>
              <CCardTitle>Informacion de tu Perfil</CCardTitle>
              <h6 style={{ fontSize: '10px', border: ' 1px solid #000', width: '55px' }}>
                BIOGRAFIA
              </h6>
            </CCardBody>
            <CRow>
              <CCol md={6} xl={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <b>Estado Civil:</b> {currentUser?.civilStatus}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Categoria:</b> {currentUser?.category}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>tipo de Personal:</b> {currentUser?.personalType}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Genero/Sexo:</b> {currentUser?.sex}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Correo:</b> {currentUser?.email}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6} xl={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <b>Fecha de Nacimiento:</b> {currentUser?.dateBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Fecha de Registro:</b> {fecha}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Lugar de Nacimiento:</b> {currentUser?.placeBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Numero de Telefono:</b> {currentUser?.phone}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Direccion de Habitacion:</b> {currentUser?.direction}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
            {/* <CCardBody>
            <CCardLink href="#">Card link</CCardLink>
            <CCardLink href="#">Another link</CCardLink>
          </CCardBody> */}
          </CCard>
        </CCol>
      </CRow>

      {/*/////////////////////////////////////////////////////////////////// */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Actualizar Datos
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            hidden={!showSpinner}
            style={{
              position: 'absolute',
              padding: '0',
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
          <DialogTitle id="alert-dialog-title">{'Actualizar Datos'}</DialogTitle>
          <DialogContent>
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Email" {...a11yProps(0)} />
                  <Tab label="Phone" {...a11yProps(1)} />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0} dir={theme.direction}>
                <Box
                  component="div"
                  style={{ textAlign: 'center' }}
                  sx={{
                    '& > :not(style)': { m: 1, width: { xs: '100%', md: '70%' } },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    type="email"
                    id="email"
                    defaultValue={currentUser?.email}
                    label="Standard"
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    value={updateData?.email}
                    type="email"
                    id="email"
                    onChange={(e) => {
                      setUpdateData({ ...updateData, email: e.target.value.toUpperCase() })
                      console.log(currentUser?.email)
                    }}
                    label="Standard"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmail />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ color: '#767982', fontSize: '11px', width: '100%' }}>
                    (Ej. SOPORTEFMUNEFM@GMAIL.COM)
                  </div>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Box
                  component="div"
                  style={{ textAlign: 'center' }}
                  sx={{
                    '& > :not(style)': { m: 1, width: { xs: '100%', md: '50%' } },
                  }}
                  autoComplete="off"
                >
                  <TextField
                    type="text"
                    id="phone"
                    defaultValue={currentUser?.phone}
                    label="Telefono Actual"
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactPhone />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    value={updateData?.phone}
                    type="number"
                    id="phone"
                    onChange={(e) => {
                      setUpdateData({ ...updateData, phone: e.target.value.toUpperCase() })
                    }}
                    label="Telefono Nuevo"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ color: '#767982', fontSize: '11px', width: '100%' }}>
                    (Ej. 04120788000)
                  </div>
                </Box>
              </TabPanel>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={UpdateData} autoFocus>
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
