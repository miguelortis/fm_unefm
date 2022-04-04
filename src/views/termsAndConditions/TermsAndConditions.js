import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

export default function ScrollDialog({ checked, setChecked }) {
  ScrollDialog.propTypes = {
    checked: PropTypes.bool,
    setChecked: PropTypes.func,
  }
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <Checkbox
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
      Acepto los <Button onClick={handleClickOpen()}>Terminos y Condiciones</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h5>CONDICIONES PARA EL USO DE LOS SERVICIOS PRESTADOS</h5>
            <span>
              Para acceder a las consultas especializadas y/o exámenes de laboratorio el paciente
              deberá recibir atención en el área de urgencias o de medicina general del Fondo
              Mutual. Todo servicio solicitado estará estrictamente sujeto al criterio del médico
              Familiar, médico residente o del Especialista tratante del Fondo Mutual.
            </span>
            <span>
              En caso de solicitar exámenes de laboratorio con órdenes de especialistas externos al
              Fondo Mutual deberá presentar ante la institución informe médico donde justifique la
              necesidad del servicio solicitado. De no ser de un especialista deberá ser evaluado
              por el médico de guardia del Fondo Mutual para el aval de la solicitud.
            </span>
            <span>
              Colocación de tratamiento y suministro de medicamentos e insumos proporcionados por la
              institución según indicaciones de los médicos de planta.
            </span>
            <span>
              2 Consultas medicas por especialidad (1por evaluación y otra por seguimiento o
              control) para cada miembro previa evaluación del médico Familiar o residente del Fondo
              Mutual quien bajo estricto criterio médico otorgará la remisión a la interconsulta
              especializada.
            </span>
            <span>
              2 exámenes de laboratorio por año (1 por control y 1 por emergencia), todo otorgado
              bajo estricto criterio del médico Familiar o residente del Fondo Mutual, igualmente
              tendrá 1 extra en caso de estar recluido en un centro de salud pública y sea necesario
              dicho estudio, para el cual deberá presentar la orden del centro donde esté recluido.
            </span>
            <span>
              En el caso que el titular no haya cancelado la cuota correspondiente del mes el
              servicio le será suspendido y le será notificado al momento de verificar el descuento
              ante el banco correspondiente; en estos casos el afiliado sólo podrá optar por la
              consulta sin derecho al suministro del tratamiento correspondiente.
            </span>
            <span>
              Cualquier otra punto o situación no contemplado en este condicionado está sujeto a la
              aprobación o no de la Junta Administradora del Fondo Mutual Hagamos uso racional y
              eficiente de los servicios, utilicemoslos con criterio de escases Fondo Mutual UNEFM
              Transformando el Sistema de Salud Universitario`
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
