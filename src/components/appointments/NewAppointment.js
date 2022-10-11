import React, { useState } from "react";
import { Autocomplete, Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './styles.css'

const {Option} = Select
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
]
export default function NewAppointment() {
  const [value, setValue] = useState('2022-04-07');
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="container-form-appointments">
      <Box sx={{mt: 2}}>
        <Grid container spacing={3}>  
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
              renderInput={(params) => <TextField {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}} label="Titular" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
              renderInput={(params) => <TextField {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}} label="Paciente" />}
            />
          </Grid>
        </Grid> 
      </Box>
      <Box sx={{mt: 2}}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
              renderInput={(params) => <TextField {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}} label="Tipo de especialista" />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{display:{sm: 'none'}}}> 
              <MobileDatePicker
                sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
                label="Fecha de cita"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}} />}
              />
            </Box>
            <Box sx={{display:{xs: 'none', sm: 'flex'}}}>
              <DatePicker
                sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
                disableFuture
                label="Fecha de cita"
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}/>}
              />
            </Box>
          </Grid>  
        </Grid> 
      </Box>
      <Box sx={{mt: 2}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <List component="nav" aria-label="main mailbox folders" sx={{ width: '100%', maxWidth: 360, maxHeight: '190px', overflowY: 'scroll', paddingLeft: 2  }}>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <ListItemButton
              key={value}
                selected={selectedIndex === value}
                onClick={(event) => handleListItemClick(event, value)}
              >
                <ListItemText primary={`especialista ${value}`} />
              </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(242, 244, 247)', maxHeight: '190px', overflowY: 'scroll', paddingLeft: 2  }}>
              {[1, 2, 3, 4, 5, 6].map((value) => (
                <ListItem
                  key={value}
                  disableGutters
                >
                  <ListItemText primary={`paciente ${value}`} />
                </ListItem>
              ))}
            </List>
          </Grid>  
        </Grid> 
      </Box>
    </div>
  )
}