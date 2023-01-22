//import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { useSelector } from "react-redux";
//import { DashboardLayout } from '../../components/dashboard-layout';

const Profile = () => {
  const { loadingProfilePic, successProfilePic, ProfilePicData } = useSelector(
    (state) => state.profilePic
  );

  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (successProfilePic) {
      setPicture(ProfilePicData);
    }
  }, [successProfilePic, loadingProfilePic]);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={3} md={4} xs={12}>
            <AccountProfile
              loadingProfilePic={loadingProfilePic}
              picture={picture}
            />
          </Grid>
          <Grid item lg={9} md={8} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Profile;
