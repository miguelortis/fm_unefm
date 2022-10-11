import React, { useState } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './styles.css'

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

  return (
    <div className="container-form-appointments">
      <Grid container spacing={3}>  
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: {xs: '100%', sm: '200px', md: '300px'} }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Grid>
      </Grid>  
      <Box sx={{mt: 2}}>
        <Box sx={{display:{sm: 'none'}}}> 
          <MobileDatePicker
            sx={{display:{sm: 'none'}}}
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{display:{xs: 'none', sm: 'flex'}}}>
          <DatePicker
            disableFuture
            label="Responsive"
            openTo="year"
            views={['year', 'month', 'day']}
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Box>
    </div>
  )
}