import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { FormControl, IconButton, Input, InputAdornment, MenuItem, useTheme, InputLabel, OutlinedInput, Select } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { categoryEnum, civilStatusEnum, personalTypeEnum } from 'src/utils/enums';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PersonalInformation({title, setUserDataToUpdate, userDataToUpdate}) {
  const [showPassword, setShowPassword] = useState(false)
  const CurrentUser = useSelector(state => state.user)
  const theme = useTheme();
  const materialUITextFieldProps = {
    fullWidth: true,
    id:"idCard",
    label:"Cedula",
    name:"idCard",
    autoComplete:"idCard",
    variant: "standard",
    disabled: true,
    required: true
  };
console.log(userDataToUpdate)
  const onChange = (e) => {
    setUserDataToUpdate((state) => ({...state, [e.target.name]: e.target.value}))
  }
  
  return userDataToUpdate && (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
          <NumericFormat
            allowNegative={false}
            customInput={TextField} 
            prefix={`${CurrentUser?.tipodocument}- `}
            decimalSeparator=","
            thousandsGroupStyle="mil"
            thousandSeparator="."
            decimalScale={0}
            value={userDataToUpdate?.idCard}
            /* onValueChange={(values, sourceInfo) => {
              console.log(values, sourceInfo);
            }} */
            {...materialUITextFieldProps}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombres"
            fullWidth
            autoComplete="name"
            variant="standard"
            value={userDataToUpdate?.name}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellidos"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={userDataToUpdate?.lastName}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <FormControl required fullWidth variant="standard">
          <InputLabel sx={{color: 'red'}} htmlFor='password'>Contraseña</InputLabel>
          <Input
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            value={userDataToUpdate?.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=> setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={userDataToUpdate?.email}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Telefono"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={userDataToUpdate?.phone}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            id="address"
            name="address"
            label="Direccion"
            fullWidth
            autoComplete="address"
            variant="standard"
            value={userDataToUpdate?.address}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            fullWidth
            id="civilStatus"
            name="civilStatus"
            select
            label="Estado civil"
            variant="standard"
            value={userDataToUpdate?.civilStatus?.toUpperCase()}
            onChange={onChange}
          >
            {Object.values(civilStatusEnum).map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            required
            fullWidth
            id="category"
            name="category"
            select
            label="Categoria"
            variant="standard"
            value={userDataToUpdate?.category?.toUpperCase()}
            onChange={onChange}
          >
            {Object.values(categoryEnum).map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <TextField
            required
            fullWidth
            id="personalType"
            name="personalType"
            select
            label="Tipo de personal"
            variant="standard"
            value={userDataToUpdate?.personalType?.toUpperCase()}
            onChange={onChange}
          >
            {Object.values(personalTypeEnum).map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

PersonalInformation.propTypes = {
  title: PropTypes.string.isRequired,
  setUserDataToUpdate: PropTypes.func,
  userDataToUpdate: PropTypes.object,
}