//import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../../components/account/account-profile';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
//import { DashboardLayout } from '../../components/dashboard-layout';

const Profile = () => (
  <>
    {/* <Head>
      <title>
        Account | Material Kit
      </title>
    </Head> */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        {/* <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Perfil
        </Typography> */}
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            md={4}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={9}
            md={8}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Profile;
