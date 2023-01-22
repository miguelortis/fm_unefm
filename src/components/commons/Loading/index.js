import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import "./index.css";
import { useSelector } from "react-redux";

export default function Loading() {
  const loading = useSelector((state) => state.loading);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 500 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
Loading.propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
};
