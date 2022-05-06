/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  CircularProgress,
  TextField,
  Select
} from '@mui/material'
import * as moment from 'moment'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default function Services() {
  const {
    state: { plans, services },
    dispatch,
  } = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", price: "", services: [] });
  const [service, setService] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)

  console.log(new Date())
  useEffect(() => {
    const handleServices = async () => {
      try {
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/services', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        dispatch({
          type: 'SET_ SERVICES',
          payload: data,
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      //console.log(dataTotal)
    }
    if (!!localStorage.getItem('token') && services.length === 0) {
      //console.log('se ejecuto')
      handleServices()
    }

  }, [dispatch, services])
  useEffect(() => {
    const handlePlans = async () => {
      try {
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/packages', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        dispatch({
          type: 'SET_ PLANS',
          payload: data,
        })
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      //console.log(dataTotal)
    }
    if (!!localStorage.getItem('token') && plans.length === 0) {
      //console.log('se ejecuto')
      handlePlans()
    }

  }, [dispatch, plans])

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null)
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null)
    setNewPlan({ name: "", price: "" })
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSubmit = async () => {
    setShowSpinner(true)

    if (newPlan.name === "" || newPlan.price === "") {
      alert('Por favor, complete todos los campos')
      setShowSpinner(false)
      return
    } else {
      console.log(newPlan)
      try {
        const { data } = await axios.post(
          'https://servidor-fmunefm.herokuapp.com/register_package',
          newPlan,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        console.log(data)
        dispatch({
          type: 'SET_ PLANS',
          payload: [data.plan],
        })
        setShowSpinner(false)
        setOpen(false)
        setNewPlan({ name: "", price: "" })
      } catch (error) {
        if (error) {
          console.log(error)
          setShowSpinner(false)
        }
      }
    }
  }
  return (
    <>
      <Card>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Servicios
              </Typography>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickOpen}>Agregar Plan</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <CardContent>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nº</StyledTableCell>
                  <StyledTableCell>Nombre del Plan</StyledTableCell>
                  <StyledTableCell >Precio</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans?.map((plan) => (
                  <TableRow hover sx={{ cursor: "pointer" }} onClick={() => alert(plan.name)} key={plan?.code}>
                    <TableCell component="th" scope="row">
                      {plan?.code}
                    </TableCell>
                    <TableCell>{plan?.name}</TableCell>
                    <TableCell>{plan?.price}</TableCell>
                    <TableCell align="right">{moment(plan?.creationDate).format('DD MMM YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/*//////////////////////////MODAL//////////////////*/}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div
          hidden={!showSpinner}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            backgroundColor: 'rgba(8, 34, 49, 0.575)',
          }}
        >
          <CircularProgress />
          <span style={{ display: 'block', color: '#fff' }}>...Cargando</span>
        </div>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Nuevo Plan
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            variant="standard"
            label="Nombre del Plan"
            autoFocus
            id="name"
            value={newPlan.name}
            onChange={(e) => {
              setNewPlan({ ...newPlan, name: e.target.value.toUpperCase() })
            }}
          />
          <TextField
            variant="standard"
            label="Precio"
            id="price"
            type="number"
            value={newPlan.price}
            onChange={(e) => {
              setNewPlan({
                ...newPlan, price: parseFloat(e.target.value)
              })
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <Select
            variant="standard"
            id="demo-simple-select-standard"
            value={service.name}
            onChange={(e) => {
              console.log(e.target.value)
              setService({ ...service, name: e.target.value })

            }}
            label="Seleccione un servicio"
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            {services?.map((service, index) => (
              <MenuItem key={index} value={service._id}>{service.name}</MenuItem>
            ))}
          </Select>

          <TextField
            variant="standard"
            id="frequency"
            type="number"
            value={service.frequency}
            onChange={(e) => {
              setNewPlan({
                ...service, frequency: e.target.value
              })
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>
            Registrar
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </>
  )
}
