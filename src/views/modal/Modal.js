import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { Card, CardContent } from '@mui/material'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
export default function Modal({ visibleModal, setVisibleModal, component }) {
  Modal.propTypes = {
    visibleModal: PropTypes.bool,
    setVisibleModal: PropTypes.func,
    component: PropTypes.object,
  }
  //const [visibleXXL, setVisibleXXL] = useState(false)

  return (
    <>
      <Dialog
        fullScreen
        open={visibleModal}
        onClose={() => setVisibleModal(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">

            </Typography> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setVisibleModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Card sx={{ minWidth: 275 }} style={{ maxHeight: '100%', overflowY: 'auto' }}>
          <CardContent>{component}</CardContent>
        </Card>
      </Dialog>
    </>
  )
}
