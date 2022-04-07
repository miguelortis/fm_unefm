import React, { useState } from 'react'
import Modal from '../modal/Modal'
import Consultafiliados from '../consultafiliados/Consultafiliados'
import { Card, CardContent, CardHeader, Button, Stack } from '@mui/material'

export default function TypeOfService() {
  const [visibleModal, setVisibleModal] = useState(false)
  const [component, setComponent] = useState()

  const handleModal = (component) => {
    if (component === 'Personal-U') {
      setComponent(<Consultafiliados />)
      setVisibleModal(!visibleModal)
    }
    if (component === 'Cliente-E') {
      setComponent(<span>hola</span>)
      setVisibleModal(!visibleModal)
    }
  }
  return (
    <Card style={{ textAlign: 'center' }} sx={{ minWidth: 275 }}>
      <CardHeader title="Tipo de Servicio" />
      <CardContent style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => handleModal('Personal-U')} variant="contained">
            Personal Unefm
          </Button>
          <Button disabled onClick={() => handleModal('Cliente-E')} variant="contained">
            Clientes Externos
          </Button>
        </Stack>
      </CardContent>
      <Modal setVisibleModal={setVisibleModal} visibleModal={visibleModal} component={component} />
    </Card>
  )
}
