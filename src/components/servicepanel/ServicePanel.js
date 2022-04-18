import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Autocomplete from '@mui/material/Autocomplete'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {
  Button,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'

export default function ServicePanel({ item }) {
  ServicePanel.propTypes = {
    item: PropTypes.object,
  }
  const [dataUser, setDataUser] = useState(null)

  console.log(item)
  console.log(dataUser)
  return (
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

          {/* ///////////////// */}
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
                      {dataUser?.user?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                      Apellido:{' '}
                      {dataUser?.user?.lastName
                        ?.toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                      Parentesco:{' '}
                      {(dataUser?.relationship === 'PADRE' && dataUser?.user?.sex === 'FEMENINO') ||
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
            //value={age}
            label="Tipo de Consulta"
            onChange={(e) => console.log(e.target.value)}
            variant="standard"
          >
            <MenuItem selected></MenuItem>
            <MenuItem value="GENERAL">Consulta General</MenuItem>
            <MenuItem value="EMERGENCIA">Consulta de Emergencia</MenuItem>
          </Select>
        </Card>
      </CardContent>
      <CardActions sx={{ justifyContent: 'right' }}>
        <Button variant="contained" autoFocus>
          Aceptar
        </Button>
      </CardActions>
    </Card>
  )
}
