import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import "../packagesAndTermsStyles.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const packagesArray = [
  {
    id: "34m3jdjc8844",
    name: "Aps plus",
    price: "4",
    services: [
      { name: "ginecologia" },
      { name: "cardiologia" },
      { name: "medicinas" },
    ],
  },
  {
    id: "3fde45t43edf",
    name: "Extremo",
    price: "3",
    services: [
      { name: "odontologia" },
      { name: "cardiologia" },
      { name: "medicinas" },
    ],
  },
  {
    id: "3t76dy24de4f",
    name: "Plan familiar",
    price: "5",
    services: [
      { name: "medicina familiar" },
      { name: "ginecologia" },
      { name: "medicinas" },
    ],
  },
  {
    id: "478lk8jku7d1",
    name: "Plan pichirre",
    price: "2",
    services: [
      { name: "pediatria" },
      { name: "medicina familiar" },
      { name: "cardiologia" },
    ],
  },
];

export default function PackagesAndTerms() {
  const [selectedPackage, setSelectedPackage] = useState(packagesArray[0]);

  const handleToggle = (value) => () => {
    setSelectedPackage(value);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {packagesArray.map((value) => {
            return (
              <ListItem key={value.id}>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <div className="checkContainer">
                      <label htmlFor={value.id}>
                        <input
                          type="radio"
                          id={value.id}
                          name="packages"
                          className="checkInput"
                          checked={selectedPackage?.id === value.id}
                          readOnly
                        />
                        <span className="checkIcon"></span>
                      </label>
                    </div>
                  </ListItemIcon>
                  <ListItemText id={value.id} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedPackage?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Servicios Medicos
            </Typography>
            {selectedPackage?.services.map((service) => {
              return (
                <Typography
                  key={service.name}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {bull}
                  {service.name}
                </Typography>
              );
            })}
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
