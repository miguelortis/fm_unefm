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
  TextField,
  Input,
  InputAdornment,
  FormControlLabel,
  Switch,
  Badge,
  CircularProgress,
} from '@mui/material'
// import { AddCircleOutline, Delete, Close, Save, Edit } from '@mui/icons-material';
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
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -15,
    top: -5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


function createData(nº, name, calories, fat) {
  return { nº, name, calories, fat }
}

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
    state: { services },
    dispatch,
  } = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "" });
  const [showSpinner, setShowSpinner] = useState(false)
  const [openInfo, setOpenInfo] = useState(false);
  const [info, setInfo] = useState({});
  const [showEdit, setEnableEdit] = useState(false);

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
    handleServices()


  }, [])

  const handleInfo = (item) => {
    setInfo({ ...item })
    setOpenInfo(true)
  };
  const updateService = async () => {
    setShowSpinner(true)
    if (info.name === '' || info.price === '') {
      return alert('No puede dejar campos vacios')
    }
    const updateService = { ...info, price: parseInt(info.price) }
    console.log(updateService)

    try {
      const { data } = await axios.put(
        'http://localhost:3100/service_update',
        updateService,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      //console.log(data.status)
      if (data.status === 201) {
        console.log(data.message)
        dispatch({
          type: 'SET_ SERVICES',
          payload: data.services,
        })
        handleClose()
        setShowSpinner(false)
      }
      if (data.status === 400) {
        console.log(data.error)
        setShowSpinner(false)
      }
    } catch (error) {
      if (error) {
        console.log(error)
        setShowSpinner(false)
      }
    }

  }
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null)
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null)
    setNewService({ name: "", price: "" })

    setOpenInfo(false);
    setEnableEdit(false);
    setInfo({ name: "", price: "", status: "", services: [] })
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
      const serviceData = { name: newService.name, price: parseFloat(newService.price) }
      console.log(serviceData)
      try {
        const { data } = await axios.post(
          'https://servidor-fmunefm.herokuapp.com/register_services',
          serviceData,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )

        dispatch({
          type: 'SET_ SERVICE',
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
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nº</StyledTableCell>
                  <StyledTableCell>Nombre del Servicio</StyledTableCell>
                  <StyledTableCell align="center">Precio $</StyledTableCell>
                  <StyledTableCell align="center">Fecha Modificacion</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services?.map((item, index) => (
                  <TableRow hover sx={{ cursor: "pointer" }} onClick={() => handleInfo(item)} key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <StyledBadge color={item?.status ? 'success' : 'error'} badgeContent={item?.status ? 'Activo' : 'Inactivo'}>
                        {item?.name}
                      </StyledBadge>
                    </TableCell>
                    <TableCell align="center">{item?.price + "$"}</TableCell>
                    <TableCell align="center">{moment(item?.ModificationDate).format('DD MMM YYYY')}</TableCell>
                    <TableCell align="right">{moment(item?.creationDate).format('DD MMM YYYY')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/*//////////////////////////MODAL info plan//////////////////*/}
      <Dialog
        open={openInfo}
        onClose={handleClose}
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
        <DialogTitle id="alert-dialog-title">
          <StyledBadge color={info.status ? 'success' : 'error'} badgeContent={info.status ? 'Activo' : 'Inactivo'}>
            <span>{showEdit ? "Editar Plan " + " " + info?.name : "Informacion del Plan" + " " + info?.name}</span>
          </StyledBadge >
        </DialogTitle>
        <DialogContent>
          <TextField
            disabled={!showEdit}
            sx={{ mr: 2 }}
            variant="standard"
            type="text"
            name='name'
            label="Nombre del Plan"
            value={info?.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value.toUpperCase() })}
          />
          <TextField
            disabled={!showEdit}
            sx={{ width: '20%' }}
            variant="standard"
            type="number"
            name='price'
            label="Precio"
            value={info?.price}
            onChange={(e) => setInfo({ ...info, price: e.target.value })}
          />
          <FormControlLabel
            disabled={!showEdit}
            value="top"
            control={<Switch color="primary" checked={info.status || false}
              onChange={(e) => {
                setInfo({ ...info, status: e.target.checked })
              }} />}
            label="Estado"
            labelPlacement="top"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button hidden={!showEdit} onClick={updateService} >
            Guardar
          </Button>
          <Button hidden={showEdit} onClick={() => setEnableEdit(true)}
            autoFocus>
            Editar
          </Button>
        </DialogActions>
      </Dialog>

      {/*//////////////////////////Nuevo servicio//////////////////*/}
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
                  ...newService, price: e.target.value,
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
