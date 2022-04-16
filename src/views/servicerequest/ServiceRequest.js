import React from 'react'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import { DialogTitle, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

export default function ServiceRequest({ openService, setOpenService, component }) {
  ServiceRequest.propTypes = {
    setOpenService: PropTypes.func,
    openService: PropTypes.bool,
    component: PropTypes.object,
  }

  const handleClose = () => {
    setOpenService(false)
  }

  return (
    <div>
      <Dialog
        open={openService}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'sm'}
        fullWidth
      >
        <DialogTitle sx={{ p: 0, textAlign: 'right' }} id="alert-dialog-title">
          <IconButton size="large" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        </DialogTitle>
        <>{component}</>
      </Dialog>
    </div>
  )
}
