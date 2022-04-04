import React, { Fragment } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

import Typography from '@mui/material/Typography'

export default function AffiliationContract() {
  return (
    <>
      {/* style="width:100px; height:115px; overflow: scroll;"*/}
      <List
        sx={{
          width: '100%',
          maxHeight: '300px',
          maxWidth: '98%',
          bgcolor: 'background.paper',
          overflowY: 'scroll',
        }}
      >
        <Typography variant="h6" color="text.primary">
          CONTRATO DE AFILIACION
        </Typography>
        {
          ' — En aras de hacer uso eficiente de los recursos financieros y humanos del Fondo Mutual la presente suscripción se regirá bajo las siguientes características...'
        }
        <br />
        {
          ' — Con el presente contrato usted y su grupo familiar "DEPENDIENDO DEL TIPO DE PLAN"podra acceder a:'
        }
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Consultas especializadas."
            secondary={<Fragment>{' — para cada miembro del grupo familiar.'}</Fragment>}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Exámenes de Laboratorio."
            secondary={<Fragment>{' — para cada miembro del grupo familiar.'}</Fragment>}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Atención en el área de urgencias."
            secondary={<Fragment>{' — para cada miembro del grupo familiar.'}</Fragment>}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Atención en el área de Medicina General o de Consulta por médico general."
            secondary={<Fragment>{' — para cada miembro del grupo familiar.'}</Fragment>}
          />
        </ListItem>
      </List>
    </>
  )
}
