import React from "react";
import {
  Autocomplete,
  Grid,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import "../styles/medicalConsultationsStyles.css";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
export default function NewAppointment() {
  return (
    <Grid container>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione un especialista"
              variant="standard"
            />
          )}
          renderOption={(props, option) => (
            <div {...props}>
              <div className="containerOption">
                <Typography
                  sx={{ display: "block" }}
                  component="span"
                  variant="subtitle1"
                >
                  Dr: {option.label}
                </Typography>
                <Typography
                  sx={{ display: "block" }}
                  component="span"
                  variant="caption"
                  color="text.primary"
                >
                  Especialidad: {option.label}
                </Typography>
              </div>
            </div>
          )}
          getOptionLabel={(option) => option.label}
        />
      </Grid>
    </Grid>
  );
}
