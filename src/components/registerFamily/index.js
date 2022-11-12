import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { CircularProgress, InputAdornment, MenuItem, Tooltip } from '@mui/material';
import { genderTypeEnum, relationshipEnum } from 'src/utils/enums';
import { useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DateTime } from 'luxon';
import {HighlightOff, CheckCircleOutline, Info} from '@mui/icons-material';
import { red, green } from '@mui/material/colors';
import calculateAge from 'src/utils/calculateAge';
import message from '../commons/message';

const theme = createTheme();

const relationShip = (key) => {
  switch (key) {
    case 'Padre':
      return 'PADRE'
    case 'Madre':
      return 'MADRE'
    case 'Hijo con cedula':
      return 'HIJO/A'
    case 'Hijo sin cedula':
      return 'HIJO/A'
    case 'Hijo sin cedula':
      return 'HIJO/A'
    case 'Conyugue':
      return 'CONYUGE'
  
    default:
      return key;
  }
}

const inicialValues = {
  documentType: 'V',
  idCard: '',
  name: '',
  lastName: '',
  relationship: '',
  placeBirth: '',
  gender: '',
  dateBirth: '',
  phone: '',

}

export default function RegisterFamily({value, onChange, type, valuesToCheck}) {
  const [newBeneficiary, setNewBeneficiary] = useState( value || inicialValues)
  const [checked, setChecked] = useState(newBeneficiary.idCard <= 4 && type !== 'new' || false)
  const [loadingInput, setLoadingInput] = useState(null)
  const handleChange = (e) => {
    if(e.target.name === 'idCard'){
      setLoadingInput('loading')
      setTimeout(() => {
        const verifyIdCard = valuesToCheck.find((value)=> value.idCard === e.target.value)
          e.target.value === '' 
            ? setLoadingInput(null) 
            : verifyIdCard 
              ? setLoadingInput('error') 
              : setLoadingInput('success')
      }, 1000);
    }
    setNewBeneficiary((state) => ({...state, [e.target.name]: e.target.value}))
  };

const materialUITextFieldProps = {
  id:"idCard",
  label:"Año y N° de acta",
  name:"idCard",
  autoComplete:"idCard",
  autoFocus: true,
  InputLabelProps:{style: {background: '#fff', padding: '0 7px'}},
  InputProps:{
    endAdornment: (
      <React.Fragment>
        {loadingInput === 'loading' && 
        <Tooltip title='Verificando' placement='top'>
          <CircularProgress color="primary" size={20} /> 
        </Tooltip>}
        {loadingInput === 'error' && 
        <Tooltip title='Ya existe' placement='top'>
          <HighlightOff sx={{ color: red[500] }} size={20} /> 
        </Tooltip>}
        {loadingInput === 'success' && 
          <CheckCircleOutline sx={{ color: green['A400'] }} size={20} /> 
        }
      
        <InputAdornment position="end">
          <Tooltip title='Datos del acta de nacimiento (año y N° de acta) ej: 1995-2350' placement='top'>
            <Info />
          </Tooltip>
        </InputAdornment>
      </React.Fragment>
    ),
  }
};
const materialUITextFieldPropsNumericF = {
  fullWidth: true,
  id:"idCard",
  label:"Cedula",
  name:"idCard",
  autoComplete:"idCard",
  InputLabelProps:{style: {background: '#fff', padding: '0 7px'}},
  disabled: type !== 'new' && newBeneficiary.idCard.length >= 4,
  InputProps:{
    endAdornment: (
      <React.Fragment>
        {loadingInput === 'loading' && 
        <Tooltip title='Verificando' placement='top'>
          <CircularProgress color="primary" size={20} /> 
        </Tooltip>}
        {loadingInput === 'error' && 
        <Tooltip title='Ya existe' placement='top'>
          <HighlightOff sx={{ color: red[500] }} size={20} /> 
        </Tooltip>}
        {loadingInput === 'success' && 
          <CheckCircleOutline sx={{ color: green['A400'] }} size={20} /> 
        }
      </React.Fragment>
    ),
  }
  
};

const handleADD = () => {
 const edad = calculateAge(newBeneficiary.dateBirth)
  if(newBeneficiary.relationship === 'HIJO/A' && edad >= 25 ){
   return message.error(`Edad permitida hasta 25a (edad actual ${edad}a)`)
  }
  if(onChange){
    onChange(newBeneficiary, type)
  }
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12} sm={6}>
              {newBeneficiary?.relationship === 'HIJO/A' && 
                <FormControlLabel
                  control={<Checkbox checked={checked} value="allowExtraEmails" onChange={(e) => setChecked(e.target.checked)} color="primary" />}
                  label="Hijo sin cedula"
                />}
              </Grid>
              {type === 'new' &&
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="relationship"
                  name="relationship"
                  select
                  label="Parentesco"
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  value={newBeneficiary?.relationship}
                  onChange={(e)=>{
                    handleChange(e)
                    setChecked(false)
                  }}
                >
                  {Object.values(relationshipEnum).map((item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      ))}
                </TextField>
              </Grid>}
              {!checked &&
                <Grid item xs={12} sm={6}>
                  <NumericFormat
                    allowNegative={false}
                    customInput={TextField} 
                    prefix={`${newBeneficiary?.documentType}- `}
                    decimalSeparator=","
                    thousandsGroupStyle="mil"
                    thousandSeparator="."
                    valueIsNumericString={true}
                    decimalScale={0}
                    value={newBeneficiary?.idCard}
                    onValueChange={(values, sourceInfo) => {
                      handleChange({target:{value: values.value, name: 'idCard'}});
                    }} 
                    {...materialUITextFieldPropsNumericF}
                  />
                </Grid>
              }
              {checked && newBeneficiary.relationship === 'HIJO/A' &&
                <Grid item xs={12} sm={6}>
                  <PatternFormat 
                    placeholder={"1995-2310"}
                    format="####-######"
                    customInput={TextField}
                    valueIsNumericString={true}
                    value={(newBeneficiary?.idCard)}
                    onValueChange={(values, sourceInfo) => {
                      handleChange({target:{value: values.value, name: 'idCard'}});
                    }}
                    {...materialUITextFieldProps}
                  />
                </Grid>
              }
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombres"
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  value={newBeneficiary?.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  value={newBeneficiary?.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Telefono"
                  id="phone"
                  autoComplete="phone"
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  value={newBeneficiary?.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  name="gender"
                  select
                  label="Género"
                  value={newBeneficiary?.gender}
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  onChange={handleChange}
                >
                  {Object.values(genderTypeEnum).map((item) => (
                        <MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </MenuItem>
                      ))}
                </TextField>
              </Grid>
              {type == 'new' &&
              <Grid item xs={12} sm={6}>
                <Box sx={{display:{sm: 'none'}}}> 
                  <MobileDatePicker
                    id="dateBirth"
                    name="dateBirth"
                    fullWidth
                    label="Fecha de nacimiento"
                    value={newBeneficiary?.dateBirth}
                    onChange={(newValue)=> handleChange({target:{value: DateTime.fromISO(newValue).toFormat('dd-MM-yyyy'), name: 'dateBirth'}})}
                    renderInput={(params) => <TextField id="dateBirth" name="dateBirth" {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}} />}
                  />
                </Box>
                <Box sx={{display:{xs: 'none', sm: 'flex'}}}>
                  <DatePicker
                    id="dateBirth"
                    name="dateBirth"
                    sx={{with: '100%'}}
                    label="Fecha de nacimiento"
                    views={['year', 'month', 'day']}
                    value={newBeneficiary?.dateBirth}
                    mask="__/__/____"
                    inputFormat='dd/MM/yyyy'
                    onChange={(newValue)=> handleChange({target:{value: newValue, name: 'dateBirth'}})}
                    renderInput={(params) => <TextField id="dateBirth" name="dateBirth" {...params} InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}/>}
                  />
                </Box>
              </Grid>}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="placeBirth"
                  label="Lugar de Nacimiento"
                  id="placeBirth"
                  InputLabelProps={{style: {background: '#fff', padding: '0 10px'}}}
                  value={newBeneficiary?.placeBirth}
                  onChange={handleChange}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleADD}
            >
              Guardar
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

RegisterFamily.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  valuesToCheck: PropTypes.array,
  type: PropTypes.string,
}