import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'

export default function Modal() {
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.showModal)

  const handleClose = () =>{
    dispatch({ type: 'SHOW_MODAL', payload: {title: '', open: !showModal?.open, content: null} })
  }
console.log(showModal)
    return(
        <>
        <Dialog
        open={showModal?.open}
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{textAlign: 'center'}} id="alert-dialog-title">
            {showModal?.title}
          </DialogTitle>
          <DialogContent>
            {showModal?.content}
          </DialogContent>
        </Dialog>
        </>
    )
}