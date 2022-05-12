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
  Select,
  InputLabel,
  FormControl,
  Divider,
  Badge
} from '@mui/material'
import { AddCircleOutline, Delete, Close, Save, Edit } from '@mui/icons-material';
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
    state: { packages, services },
    dispatch,
  } = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false);
  const [newPackage, setnewPackage] = useState({ name: "", price: "" });
  const [allServices, setAllServices] = useState([]);
  const [service, setService] = useState({ name: "", frequency: "" });
  const [showSpinner, setShowSpinner] = useState(false)
  const [openInfo, setOpenInfo] = useState(false);
  const [info, setInfo] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editServices, setEditServices] = useState({});
  const [editEnable, setEditEnable] = useState(null);
  console.log(packages)
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


  }, [dispatch])
  useEffect(() => {
    const handlePackages = async () => {
      try {
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/packages', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        console.log(data)
        dispatch({
          type: 'SET_ PACKAGES',
          payload: data,
        })
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      console.log(packages)
    }

    handlePackages()


  }, [])

  useEffect(() => {

    setnewPackage({
      ...newPackage, services: allServices?.map((item) => {
        return {
          service: item?._id, frequency: item?.frequency
        }
      })
    })


  }, [allServices])

  const handleInfo = (item) => {
    setInfo({ ...item })
    setOpenInfo(true)
  };
  const handleClickOpen = () => {
    setOpen(true)
    setAnchorEl(null)
  };

  const updatePackage = async () => {
    setShowSpinner(true)
    let updatePackage = info;
    if (newPackage.name === '') {
      updatePackage = { ...updatePackage, name: info?.name }
    }
    if (newPackage.price === '') {
      updatePackage = { ...updatePackage, price: info?.price }
    }

    console.log(updatePackage)
    console.log(info?.name)

    updatePackage = {
      ...updatePackage, services: info?.services?.map((item) => {
        return { service: item?.service?._id, frequency: item?.frequency }
      })
    }
    console.log(updatePackage)
    try {
      const { data } = await axios.put(
        'http://localhost:3100/package_update',
        updatePackage,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      console.log(data.status)
      if (data.status === 201) {
        console.log('actualizado')
        dispatch({
          type: 'SET_ PACKAGES',
          payload: data.packages,
        })
        setOpenInfo(false)
        setShowEdit(false);
        setShowSpinner(false)
      }
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }

  }
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
    setnewPackage({ name: "", price: "" })
    setAllServices([])
    setService({ name: "", frequency: "" })
    setOpenInfo(false);
    setShowEdit(false);
    setEditServices([])
    setEditEnable(null)
  };
  const updateService = (index) => {
    console.log(info)
    console.log(editServices)
    info?.services.splice(index, 1, editServices);
    console.log(info)
    // setInfo({ ...info, services: [...newArray, editServices] })
  }
  const handleService = () => {
    if (!!service.name && !!service.frequency) {
      setAllServices([...allServices, service]);
      setService({ name: "", frequency: "" })
    } else {
      alert('Por favor llene todos los campos')
    }
  };
  const deleteService = (id) => {
    const newArray = allServices?.filter((item) => item?._id !== id);
    setAllServices(newArray);

    const newArray1 = info?.services?.filter((item) => item?._id !== id);
    setInfo({ ...info, services: newArray1 });
    console.log(newArray1)
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSubmit = async () => {
    setShowSpinner(true)

    if (newPackage?.name === "" || newPackage?.price === "" || allServices?.length === 0) {
      alert('Por favor, complete todos los campos')
      setShowSpinner(false)
      return
    } else {
      console.log(newPackage)
      setShowSpinner(false)
      try {
        const { data } = await axios.post(
          'http://localhost:3100/register_package',
          newPackage,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        console.log(data)
        dispatch({
          type: 'SET_ PACKAGE',
          payload: [...data.package],
        })
        setShowSpinner(false)
        setOpen(false)
        setnewPackage({ name: "", price: "" })
        setAllServices([])
        setService({ name: "", frequency: "" })
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
                Planes de Cobertura
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
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nº</StyledTableCell>
                  <StyledTableCell>Nombre del Plan</StyledTableCell>
                  <StyledTableCell >Precio</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages?.map((item, index) => (
                  <TableRow hover sx={{ cursor: "pointer" }} onClick={() => handleInfo(item)} key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.price}</TableCell>
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
          {"Editar Plan " + info?.name}
        </DialogTitle>
        <DialogContent>
          <div hidden={!showEdit}>
            <TextField
              variant="standard"
              type="text"
              name='name'
              label="Nombre del Plan"
              value={info?.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
            <TextField
              variant="standard"
              type="number"
              name='price'
              label="Precio"
              value={info?.price}
              onChange={(e) => setInfo({ ...info, price: parseInt(e.target.value) })}
            />
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre del servicio</StyledTableCell>
                    <StyledTableCell align="center">Frecuencia de Uso</StyledTableCell>
                    <StyledTableCell align="center">Accion</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {info?.services?.map((item, index) => (
                    <TableRow hover key={index}>

                      <TableCell>{item?.service?.name}</TableCell>
                      <TableCell align="center">
                        <TextField
                          sx={{ width: "50%" }}
                          disabled={editEnable === index ? false : true}
                          variant="standard"
                          type="number"
                          name='frequency'
                          label="cantidad"
                          defaultValue={item?.frequency}
                          onChange={(e) => {
                            setEditServices({ ...item, frequency: parseInt(e.target.value) })
                            console.log(editServices);
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" >
                        <IconButton hidden={editEnable === null ? false : true} onClick={() => setEditEnable(index)} aria-label="delete" size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton hidden={editEnable === index ? false : true} onClick={() => {
                          deleteService(item?._id)
                          setEditEnable(null)
                        }} aria-label="delete" size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                        <IconButton hidden={editEnable === index ? false : true} onClick={() => {
                          updateService(index)
                          setEditEnable(null)
                        }} aria-label="delete" size="small">
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton hidden={editEnable === index ? false : true} onClick={() => {
                          setEditEnable(null)
                        }} aria-label="delete" size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div hidden={showEdit}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre del servicio</StyledTableCell>
                    <StyledTableCell align="center">Frecuencia de Uso</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {info?.services?.map((item, index) => (
                    <TableRow hover key={index}>

                      <TableCell>{item?.service?.name}</TableCell>
                      <TableCell align="center">{item?.frequency}</TableCell>
                      <TableCell align="center"><Badge color="success" badgeContent={item?.service?.status ? "Activo" : "Inactivo"} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button hidden={!showEdit} onClick={updatePackage} autoFocus>
            Guardar
          </Button>
          <Button hidden={showEdit} onClick={() => setShowEdit(true)}
            autoFocus>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      {/*//////////////////////////MODAL nuevo plan//////////////////*/}
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
            sx={{ width: '50%', m: 2 }}
            variant="standard"
            label="Nombre del Plan"
            autoFocus
            id="name"
            value={newPackage.name}
            onChange={(e) => {
              setnewPackage({ ...newPackage, name: e.target.value.toUpperCase() })
            }}
          />
          <TextField
            sx={{ width: '20%', m: 2 }}
            variant="standard"
            label="Precio"
            id="price"
            type="number"
            value={newPackage.price}
            onChange={(e) => {
              setnewPackage({
                ...newPackage, price: parseInt(e.target.value)
              })
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <Divider sx={{ mt: 2, mb: 2 }}>Servicios del plan de cobertura</Divider>
          {allServices.length > 0 && <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>N°</TableCell>
                  <TableCell >Servicio</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allServices?.map((service, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell >{service.name}</TableCell>
                    <TableCell align="center" >{service.frequency}</TableCell>
                    <TableCell align="center" >
                      <IconButton onClick={() => deleteService(service._id)} aria-label="delete" size="small">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>}
          <FormControl variant="filled" sx={{ width: '50%', mr: 2, mt: 1 }}>
            <InputLabel id='service'>Servicio</InputLabel>
            <Select
              variant="standard"
              id="service"
              vale={service}
              onChange={(e) => {
                setService({ ...service, ...e.target.value })

                console.log(service)
              }}
            >
              <MenuItem>
                <em>Seleccione un servicio</em>
              </MenuItem>
              {services?.map((service, index) => (
                <MenuItem key={index} value={service}>{service.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: '30%', mr: 2, mt: 1 }}>
            <TextField
              label="Cantidad"
              variant="standard"
              id="frequency"
              type="number"
              value={service.frequency}
              onChange={(e) => {
                setService({
                  ...service, frequency: parseInt(e.target.value)
                })
                console.log(service)
              }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ width: '5%', mt: 3 }}>
            <IconButton onClick={handleService} color="primary">
              <AddCircleOutline />
            </IconButton>
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
