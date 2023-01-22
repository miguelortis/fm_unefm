import React from "react";
import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Crop, Close, Send } from "@mui/icons-material";
import { useState, useEffect } from "react";
import CropEasy from "../crop/CropEasy";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "src/redux/actions/modalActions";
import { showLoading } from "src/redux/actions/loadingActions";
import message from "../message";
import { updateProfilePicture } from "src/redux/actions/userActions";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { loadingProfilePic, successProfilePic, ProfilePicData } = useSelector(
    (state) => state.profilePic
  );
  const modal = useSelector((state) => state.modal);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (successProfilePic) {
      setPicture(ProfilePicData);
    }
  }, [successProfilePic]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };
  const handleSubmit = async () => {
    if (file !== null) {
      console.log(file);
      dispatch(showLoading(true));

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");
          localStorage.setItem("Profile-Picture", base64String);
          console.log(file, "se ejecuto");
          dispatch(updateProfilePicture({ profilePic: base64String }));
        };
        reader.readAsDataURL(file);
        message.success("Foto de perfil actualizada");
      } catch (error) {
        message.error(error.message);
        console.log(error);
      }
    } else {
      message.error("No se actualizo la foto de perfil");
    }
    dispatch(showLoading(false));
    dispatch(showModal({ open: false }));
  };

  useEffect(() => {
    if (openCrop) {
      dispatch(showModal({ ...modal, title: "Editar Imagen" }));
    } else {
      dispatch(showModal({ ...modal, title: "Actualizar Perfil" }));
    }
  }, [openCrop]);

  return !openCrop ? (
    <div>
      <DialogContent dividers sx={{ textAlign: "center" }}>
        <DialogContentText sx={{ textAlign: "center" }}>
          Ingresa una foto de perfil
          <Typography sx={{ display: "block" }} variant="caption">
            (opcional)
          </Typography>
        </DialogContentText>
        <Box sx={{ display: "block", alignItems: "center" }}>
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={photoURL ? photoURL : `data:image/png;base64,${picture}`}
              sx={{
                width: 75,
                height: 75,
                cursor: "pointer",
                margin: "0 auto",
              }}
            />
          </label>
          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          endIcon={<Send />}
          disabled={file == null}
        >
          Aceptar
        </Button>
        <Button
          onClick={() => dispatch(showModal({ open: false }))}
          color="error"
          variant="outlined"
          endIcon={<Close />}
        >
          Cancelar
        </Button>
      </DialogActions>
    </div>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default ProfilePicture;
