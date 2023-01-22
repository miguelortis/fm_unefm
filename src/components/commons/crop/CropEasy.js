import { Cancel } from "@mui/icons-material";
import PropTypes from "prop-types";
import CropIcon from "@mui/icons-material/Crop";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import { useDispatch } from "react-redux";
import message from "../message";
import { showLoading } from "src/redux/actions/loadingActions";

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 10, y: 100 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    dispatch(showLoading(true));
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
    dispatch(showLoading(false));
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 250,
          width: "auto",
          minWidth: { sm: 300 },
        }}
      >
        <Cropper
          cropShape="round"
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column" }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};

CropEasy.propTypes = {
  photoURL: PropTypes.string,
  setOpenCrop: PropTypes.func,
  setPhotoURL: PropTypes.func,
  setFile: PropTypes.func,
};
