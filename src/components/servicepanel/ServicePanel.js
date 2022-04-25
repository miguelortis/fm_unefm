import React, { useState, useEffect } from 'react'
import {
  Button,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Card,
  Snackbar,
  Autocomplete,
  CardContent,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import { CSpinner } from '@coreui/react-pro'
import Socket from '../../components/Socket'

export default function ServicePanel({ item, setOpenService }) {
  ServicePanel.propTypes = {
    item: PropTypes.object,
    setOpenService: PropTypes.func,
  }
  const [showSpinner, setShowSpinner] = useState(false)
  const { dispatch } = useContext(Context)
  const [dataUser, setDataUser] = useState(null)
  const [newService, setNewService] = useState({ queryType: null })
  const [message, setMessage] = useState({
    error: null,
    success: 'Solicitud realizada con Éxito',
  })
  const [showSnackbar, setShowSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = showSnackbar

  useEffect(() => {
    Socket.on('error', (error) => {
      console.log(error)
      setMessage({ ...message, error: error })
    })

    return () => {
      Socket.off()
    }
  }, [])

  useEffect(() => {
    if (item?.userId) {
      setNewService({
        ...newService,
        patientIdCard: item?.idCard,
        user: dataUser?.user?._id,
        patientType: 'Beneficiario',
      })
    } else {
      setNewService({
        ...newService,
        patientIdCard: item?.idCard,
        user: null,
        patientType: 'Titular',
      })
    }
  }, [item, dataUser])

  const handleCloseSnackbar = () => {
    setShowSnackbar({ ...showSnackbar, open: false })
  }

  const handleSubmitService = async (e) => {
    e.preventDefault()
    setShowSpinner(true)
    console.log(newService)
    if (newService.patientType === 'Beneficiario' && newService.user === undefined) {
      setMessage({ ...message, error: 'Seleccione un Titular' })
      setShowSnackbar({ open: true })
      setShowSpinner(false)
      return
    }
    if (
      newService.queryType === null ||
      newService.patientIdCard === null ||
      newService.patientType === null
    ) {
      setMessage({ ...message, error: 'Todos los campos son requeridos' })
      setShowSnackbar({ open: true })
      setShowSpinner(false)
    } else {
      Socket.emit('service', newService)
      Socket.on('services', (Consultations) => {
        console.log(Consultations)
        dispatch({
          type: 'SET_CONSULTATIONS',
          payload: [...Consultations],
        })
      })
      setOpenService(false)
      setShowSpinner(false)
      setShowSnackbar({ open: true })
    }
  }

  return (
    <>
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
      <Card sx={{ minWidth: 275, backgroundColor: '#EDF0F7' }}>
        <CardHeader sx={{ pt: 0, backgroundColor: '#fff' }} title="Solicitud de Servicio" />
        <CardContent>
          <Grid
            container
            justifyContent="center"
            spacing={1}
            sx={{ flexGrow: 1, backgroundColor: '#EDF0F7' }}
            //columnSpacing={{ xs: 1, sm: 2, md: 1 }}
          >
            {/* /////////////PACIENTE///////////// */}
            <Grid item xs={12} sm={6} md={6} sx={{ backgroundColor: '#EDF0F7' }}>
              <Card sx={{ p: 2, pt: 0, height: '100%' }}>
                <CardHeader
                  sx={{
                    fontSize: 18,
                    textAling: 'center',
                  }}
                  disableTypography
                  title="Datos del Paciente"
                />
                <Divider sx={{ mb: 2 }} />
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Cedula: {item?.documentType}
                  {item?.idCard}
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Nombre: {item?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </Typography>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Apellido: {item?.lastName?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </Typography>
              </Card>
            </Grid>

            {/* ///////////// TITULAR///////// */}
            {item.userId && (
              <Grid item xs={12} sm={6} md={6} sx={{ backgroundColor: '#EDF0F7' }}>
                <Card sx={{ p: 2, pt: 0, height: '100%' }}>
                  <CardHeader
                    sx={{
                      fontSize: 18,
                      textAling: 'center',
                    }}
                    disableTypography
                    title="Titular"
                  />
                  <Divider sx={{ mb: 2 }} />
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: '100%' }}
                    options={item?.userId}
                    onChange={(event, newValue) => {
                      setDataUser(newValue)
                    }}
                    autoHighlight
                    getOptionLabel={(option) =>
                      `${option?.user?.documentType}${option?.user?.idCard}`
                    }
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option?.user?.name} {option?.user?.lastName}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <div style={{ fontSize: 18 }}>
                        Cedula:{' '}
                        <TextField
                          variant="standard"
                          sx={{ width: { xs: '100%', md: '70%' }, backgroundColor: '#EDF0F7' }}
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',
                          }}
                        />
                      </div>
                    )}
                  />
                  {dataUser && (
                    <>
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Nombre:{' '}
                        {dataUser?.user?.name
                          ?.toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Typography>
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Apellido:{' '}
                        {dataUser?.user?.lastName
                          ?.toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Typography>
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        Parentesco:{' '}
                        {(dataUser?.relationship === 'PADRE' &&
                          dataUser?.user?.sex === 'FEMENINO') ||
                        (dataUser?.relationship === 'MADRE' && dataUser?.user?.sex === 'FEMENINO')
                          ? 'Hija'
                          : (dataUser?.relationship === 'PADRE' &&
                              dataUser?.user?.sex === 'MASCULINO') ||
                            (dataUser?.relationship === 'MADRE' &&
                              dataUser?.user?.sex === 'MASCULINO')
                          ? 'Hijo'
                          : dataUser?.relationship === 'HIJO' && dataUser?.user?.sex === 'MASCULINO'
                          ? 'Padre'
                          : dataUser?.relationship === 'HIJO' && dataUser?.user?.sex === 'FEMENINO'
                          ? 'Madre'
                          : dataUser?.relationship === 'HIJO' && dataUser?.user?.sex === 'FEMENINO'
                          ? 'Madre'
                          : 'Conyuge'}
                      </Typography>
                    </>
                  )}
                </Card>
              </Grid>
            )}
          </Grid>
          {/* ///// TIPO CONSULTA/////// */}
          <Card
            sx={{
              p: 2,
              pt: 0,
              mt: 2,
              width: '100%',
              minWidth: 120,
              textAling: 'center',
              backgroundColor: '#fff',
            }}
          >
            <CardHeader
              sx={{
                fontSize: 18,
                textAling: 'center',
              }}
              disableTypography
              title="Tipo de Consulta"
            />
            <Divider sx={{ mb: 2 }} />
            <Select
              sx={{ width: { xs: '100%', md: '50%' }, backgroundColor: '#EDF0F7' }}
              name="queryType"
              //value={age}
              label="Tipo de Consulta"
              onChange={(e) => setNewService({ ...newService, queryType: e.target.value })}
              variant="standard"
            >
              <MenuItem selected></MenuItem>
              <MenuItem value="GENERAL">Consulta General</MenuItem>
              <MenuItem value="EMERGENCIA">Consulta de Emergencia</MenuItem>
            </Select>
          </Card>
        </CardContent>
        <CardActions sx={{ justifyContent: 'right' }}>
          <Button onClick={handleSubmitService} variant="contained" autoFocus>
            Aceptar
          </Button>
        </CardActions>
      </Card>
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleCloseSnackbar}
          message={message?.error ? message?.error : message?.success}
          key={vertical + horizontal}
        />
      </div>
    </>
  )
}
