import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {KeyboardArrowDown, KeyboardArrowUp, ArrowForwardIos, ArrowBackIos, ErrorOutline, AccountBox, Edit} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types'
import message from '../message';
import calculateAge from 'src/utils/calculateAge';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const errorEmptyFields = (values) => {
  const noValues= []
  for (const property in values) {
    if(property === 'idCard'){
      values[property].length <= 4 && noValues.push(property)
      continue
    }
    if(values[property] === null || values[property] === '' || values[property] === undefined){
      noValues.push(property)
    }
  }
return noValues
}

export default function TransferList({handlerEdit, leftDefaults, rightDefaults, onChange}) {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(leftDefaults);
  const [right, setRight] = useState(rightDefaults);

  useEffect(() => {
    setLeft(leftDefaults)
  }, [leftDefaults])

  useEffect(() => {
    if(onChange){
      onChange(left, right)
    }
  }, [right, left])

  useEffect(() => {
    if(rightDefaults){
      setRight(rightDefaults)
    }
  }, [rightDefaults])
  

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleCheckedRight = () => {
    const edad = calculateAge(leftChecked[0].dateBirth)
    console.log(edad)
    if(leftChecked[0].relationship === 'HIJO/A' && edad >= 25 ){
      return message.error(`Edad permitida hasta 25a (edad actual ${edad}a)`)
     }
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <AccountBox sx={{fontSize: 40}}/>
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: '100%',
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, i) => {
          const labelId = `transfer-list-all-item-${value.name}-label`;
          return (
            <ListItem
              key={value.idCard}
              role="listitem"
              button={!errorEmptyFields(value).length > 0}
            >
              <ListItemIcon>
                {!errorEmptyFields(value).length > 0 &&
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  onClick={handleToggle(value)}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />}
                {errorEmptyFields(value).length > 0 && 
                  <Tooltip title='Faltan campos por llenar!...' placement='top'>
                      <ErrorOutline sx={{ color: red[500] }}/>
                  </Tooltip>
                }
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
                <IconButton onClick={()=> handlerEdit(value)}>
                  <Tooltip title='Editar Familiar' placement='top'>
                      <Edit color='primary'/>
                  </Tooltip>
                </IconButton>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4}>{customList('Familiares Actuales', left)}</Grid>
      <Grid item xs={12} sm={2}>
        <Grid sx={{display: {xs: 'none', sm: 'flex'}}} container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <ArrowForwardIos sx={{fontSize: 20}}/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <ArrowBackIos sx={{fontSize: 20}}/>
          </Button>
        </Grid>
        <Grid sx={{display: { sm: 'none'}, flexDirection: {xs: 'row', sm: 'column'}, justifyContent: 'center',}} container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <KeyboardArrowDown sx={{fontSize: 20}}/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <KeyboardArrowUp sx={{fontSize: 20}}/>
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>{customList('Familiares a renovar', right)}</Grid>
    </Grid>
  );
}
TransferList.propTypes = {
  handlerEdit: PropTypes.func,
  rightDefaults: PropTypes.array,
  leftDefaults: PropTypes.array,
  onChange: PropTypes.func,
}