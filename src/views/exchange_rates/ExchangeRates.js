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
    Badge,
    CircularProgress,
    Select,
} from '@mui/material'
import { Save } from '@mui/icons-material';
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
        state: { exchangeRate },
        dispatch,
    } = useContext(Context)
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false);
    const [newExchangeRate, setNewExchangeRate] = useState({ currencyType: "", value: "" });
    const [newUpdate, setNewUpdate] = useState({ currencyType: "", value: "" });
    const [showSpinner, setShowSpinner] = useState(false)
    const [openInfo, setOpenInfo] = useState(false);
    const [info, setInfo] = useState({});
    const [enableEdit, setEnableEdit] = useState(false);
    useEffect(() => {
        const handleServices = async () => {
            try {
                const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/exchange_rates', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    //cancelToken: source.token,
                })
                dispatch({
                    type: 'SET_ EXCHANGE-RATE',
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
    const updateExchangeRate = async () => {
        if (newUpdate.currencyType === '' || newUpdate.value === '') {
            return alert('No puede dejar campos vacios')
        }
        const newData = { ...newUpdate, value: parseFloat(newUpdate.value) }
        console.log(newData)

        try {
            const { data } = await axios.put(
                'https://servidor-fmunefm.herokuapp.com/update_exchange-rates',
                newData,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            //console.log(data.status)
            if (data.status === 201) {
                console.log(data.message)
                console.log(data.exchangeRates)
                dispatch({
                    type: 'SET_ EXCHANGE-RATE',
                    payload: data.exchangeRates,
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
        setNewExchangeRate({ name: "", price: "" })
        setNewUpdate({ value: "" })
        setOpenInfo(false);
        setEnableEdit(false);
        setInfo({ name: "", price: "", status: "", services: [] })
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleSubmit = async () => {
        setShowSpinner(true)

        if (newExchangeRate.name === "" || newExchangeRate.price === "") {
            alert('Por favor, complete todos los campos')
            setShowSpinner(false)
            return
        } else {
            const serviceData = { name: newExchangeRate.name, price: parseFloat(newExchangeRate.price) }
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
                setNewExchangeRate({ name: "", price: "" })
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
                                Tasa de cambio
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
                                    <MenuItem onClick={() => {
                                        handleClickOpen()
                                        setEnableEdit(true)
                                    }}>Actualizar Divisa</MenuItem>
                                    <MenuItem disabled onClick={() => {
                                        handleClickOpen()
                                        setEnableEdit(false)
                                    }
                                    }>Agregar Divisa</MenuItem>
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
                                    <StyledTableCell>Tipo de Divisa</StyledTableCell>
                                    <StyledTableCell align="center">Tasa (Bs)</StyledTableCell>
                                    <StyledTableCell align="center">Hora Actualizacion</StyledTableCell>
                                    <StyledTableCell align="right">Fecha de Actualizacion</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exchangeRate?.map((item, index) => (
                                    <TableRow hover sx={{ cursor: "pointer" }} onClick={() => handleInfo(item)} key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item?.currencyType}
                                        </TableCell>
                                        <TableCell align="center">{parseFloat(Math.round(item?.value * 100) / 100).toFixed(2) + "Bs"}</TableCell>
                                        <TableCell align="center">{moment(item?.registrationDate).format('hh:mm:ss A')}</TableCell>
                                        <TableCell align="right">{moment(item?.registrationDate).format('DD MMM YYYY')}</TableCell>
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
                    <span>
                        {"Informacion de la Divisa" + " " + info?.currencyType}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nº</StyledTableCell>
                                    <StyledTableCell>Tipo de Divisa</StyledTableCell>
                                    <StyledTableCell align="center">Tasa (Bs)</StyledTableCell>
                                    <StyledTableCell align="center">Hora Actualizacion</StyledTableCell>
                                    <StyledTableCell align="right">Fecha de Actualizacion</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {info?.old_rates?.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item?.currencyType}
                                        </TableCell>
                                        <TableCell align="center">{parseFloat(Math.round(item?.value * 100) / 100).toFixed(2) + "Bs"}</TableCell>
                                        <TableCell align="center">{moment(item?.registrationDate).format('hh:mm:ss A')}</TableCell>
                                        <TableCell align="right">{moment(item?.registrationDate).format('DD MMM YYYY')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>

                </DialogActions>
            </Dialog>

            {/*//////////////////////////Nueva Divisa/////////////////*/}
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
                    Registrar y Actualizar Divisa
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl variant="filled" sx={{ width: '50%', mr: 2, mt: 1 }}>
                        <InputLabel id='service'>Tipo de Divisa</InputLabel>
                        <Select
                            variant="standard"
                            id="service"
                            vale={newUpdate.currencyType}
                            onChange={(e) => {
                                setNewUpdate({ ...newUpdate, currencyType: e.target.value.toUpperCase() })
                            }}
                        >
                            <MenuItem>
                            </MenuItem>
                            {exchangeRate.map((item, index) => (
                                <MenuItem key={index} value={item?.currencyType}>{item?.currencyType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl hidden={!enableEdit} fullWidth sx={{ m: 1, width: "15%" }} variant="standard">
                        <InputLabel htmlFor="price">Precio</InputLabel>
                        <Input
                            id="price"
                            type="number"
                            value={newUpdate.value}
                            onChange={(e) => {
                                setNewUpdate({
                                    ...newUpdate, value: e.target.value,
                                })
                            }}
                        />
                    </FormControl>
                    <FormControl hidden={!enableEdit} fullWidth sx={{ m: 1, mt: 2, width: "5%" }} variant="standard">
                        <IconButton color="primary" onClick={() => {
                            updateExchangeRate()
                        }} aria-label="delete">
                            <Save />
                        </IconButton>
                    </FormControl>

                    {/*///////*/}
                    <FormControl hidden={enableEdit} fullWidth sx={{ m: 1, width: "90%" }} variant="standard">
                        <InputLabel htmlFor="name">Tipo de Divisa</InputLabel>
                        <Input
                            id="name"
                            value={newExchangeRate.name}
                            onChange={(e) => {
                                setNewExchangeRate({ ...newExchangeRate, name: e.target.value.toUpperCase() })
                            }}
                        />
                    </FormControl>
                    <FormControl hidden={enableEdit} fullWidth sx={{ m: 1, width: "90%" }} variant="standard">
                        <InputLabel htmlFor="price">Precio</InputLabel>
                        <Input
                            id="price"
                            type="number"
                            value={newExchangeRate.price}
                            onChange={(e) => {
                                setNewExchangeRate({
                                    ...newExchangeRate, price: e.target.value,
                                })
                            }}
                        />
                    </FormControl>
                    <FormControl hidden={enableEdit} fullWidth sx={{ m: 1, mt: 2, width: "5%" }} variant="standard">
                        <IconButton color="primary" onClick={() => {
                            updateExchangeRate()
                        }} aria-label="delete">
                            <Save />
                        </IconButton>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cerrar
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    )
}
