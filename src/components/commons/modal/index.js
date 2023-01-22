import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "src/redux/actions/modalActions";

export default function Modal() {
  const dispatch = useDispatch();
  const { title, open, content } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(showModal({ open: false }));
  };
  return (
    <>
      <Dialog
        open={open}
        maxWidth={false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          id="alert-dialog-title"
        >
          {title || "Sin Titulo"}
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </>
  );
}
