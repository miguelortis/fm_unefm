/* eslint-disable prettier/prettier */
//
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
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  CircularProgress,
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(nº, name, calories, fat) {
  return { nº, name, calories, fat }
}

const rows = [
  createData(1, 'Laboratorio', "10$", "03/05/2022"),
  createData(2, 'Cardiologia', "15$", "03/05/2022"),
  createData(3, 'Ginecologia', "15$", "03/05/2022"),
]
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
    state: { currentUser, services },
    dispatch,
  } = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [showSpinner, setShowSpinner] = useState(false)


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

  }, [])

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null)
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null)
    setNewService({ name: "", price: "" })
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSubmit = async () => {
    setShowSpinner(true)

    if (newService.name === "" || newService.price === "") {
      alert('Por favor, complete todos los campos')
      setShowSpinner(false)
      return
    } else {
      console.log(newService)
      try {
        const { data } = await axios.post(
          'https://servidor-fmunefm.herokuapp.com/register_services',
          newService,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )

        dispatch({
          type: 'SET_ SERVICES',
          payload: [data.service],
        })
        setShowSpinner(false)
        setOpen(false)
        setNewService({ name: "", price: "" })
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
                  <MenuItem onClick={handleClickOpen}>Agregar Servicio</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nº</StyledTableCell>
                  <StyledTableCell>Nombre del Servicio</StyledTableCell>
                  <StyledTableCell >Precio</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services?.map((service) => (
                  <StyledTableRow key={service?.code}>
                    <StyledTableCell component="th" scope="row">
                      {service?.code}
                    </StyledTableCell>
                    <StyledTableCell>{service?.name}</StyledTableCell>
                    <StyledTableCell>{service?.price}</StyledTableCell>
                    <StyledTableCell align="right">{moment(services?.creationDate).format('DD MMM YYYY')}</StyledTableCell>
                  </StyledTableRow>
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
          Nuevo Servicio
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth sx={{ m: 1, width: "90%" }} variant="standard">
            <InputLabel htmlFor="name">Nombre del Servicio</InputLabel>
            <Input
              autoFocus
              id="name"
              value={newService.name}
              onChange={(e) => {
                setNewService({ ...newService, name: e.target.value.toUpperCase() })
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: "90%" }} variant="standard">
            <InputLabel htmlFor="price">Precio</InputLabel>
            <Input
              id="price"
              type="number"
              value={newService.price}
              onChange={(e) => {
                setNewService({
                  ...newService, price: parseFloat(e.target.value)
                })
              }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
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
