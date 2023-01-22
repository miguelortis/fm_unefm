import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  styled,
  Divider,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Context } from "src/contexts/Context";
import ProfilePicture from "../commons/profilePicture/ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "src/redux/actions/modalActions";
import CircularProgress from "@mui/material/CircularProgress";
import { USER_PROFILE_PIC_RESET } from "src/redux/constants/userConstants";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const AccountProfile = ({ loadingProfilePic, picture }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const onChange = () => {
    dispatch(
      showModal({
        open: true,
        title: "Foto de perfil",
        content: <ProfilePicture />,
      })
    );
  };
  return (
    <Item>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={loadingProfilePic ? "" : `data:image/png;base64,${picture}`}
          sx={{
            height: 124,
            mb: 2,
            width: 124,
          }}
        >
          <CircularProgress color="inherit" />
        </Avatar>
        <Typography color="textPrimary" variant="h5">
          {currentUser?.user?.name
            ?.toLowerCase()
            ?.replace(/\b\w/g, (l) => l.toUpperCase())}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          {`${currentUser?.user?.lastName
            ?.toLowerCase()
            ?.replace(/\b\w/g, (l) => l.toUpperCase())}`}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {`(${currentUser?.user?.idCard})`}
        </Typography>
      </Box>
      <Divider />
      <Button
        color="primary"
        fullWidth
        variant="text"
        onClick={onChange}
        component="label"
      >
        Subir foto
        {/* <input hidden accept="image/*" multiple type="file" onChange={onChange}/> */}
      </Button>
    </Item>
  );
};
AccountProfile.propTypes = {
  loadingProfilePic: PropTypes.bool,
  picture: PropTypes.string,
};
