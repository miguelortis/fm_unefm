import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, Grid
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { TYPES } from 'src/actions/modalAction';
import NewAppointment from './NewAppointment';

export const AppointmentsListToolbar = ({setSearch, customers}) => {
const dispatch = useDispatch()
const handleAppointment = () =>{
  dispatch({type: TYPES.SHOW_MODAL, payload: {title: 'Nueva Cita', open: true, content: <NewAppointment/>}})
}

const handleSearch = (e) =>{
  setSearch(customers.filter((customer) => customer.name.toLowerCase().includes(e.target.value.toLowerCase()) || customer.phone.includes(e.target.value)))
  console.log(customers)
}
return (
  <Box>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h5"
      >
        Citas
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search customer"
                  variant="outlined"
                  size='small'
                  onChange={handleSearch}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7} sx={{display: 'flex', justifyContent: 'end'}}>
              <Box>
                <Button
                  //startIcon={(<UploadIcon fontSize="small" />)}
                  sx={{ mr: 1 }}
                >
                  Import
                </Button>
                <Button
                  //startIcon={(<DownloadIcon fontSize="small" />)}
                  sx={{ mr: 1 }}
                >
                  Export
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleAppointment}
                >
                  Crear cita
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};
AppointmentsListToolbar.propTypes = {
  setSearch: PropTypes.func,
  customers: PropTypes.array,
};