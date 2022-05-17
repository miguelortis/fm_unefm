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
  Badge,
  InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import * as moment from 'moment'
import { styled, alpha } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import Menu from '@mui/material/Menu'
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import CloseIcon from '@mui/icons-material/Close';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import axios from 'axios'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function AdminTitulares() {
  const {
    state: { },
    dispatch,
  } = useContext(Context)
  const [titulares, setTitulares] = useState([])

  useEffect(() => {
    const handleTitulares = async () => {
      try {
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/titulares', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          //cancelToken: source.token,
        })
        setTitulares(data)
        console.log(titulares)
      } catch (error) {
        //console.log(error)
        if (error?.response?.status === 401) {
          console.log(error)
        }
      }
      //console.log(dataTotal)
    }
    handleTitulares()


  }, [])
  return (
    <>
      <Card>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                MUI
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <CardContent>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Cedula</StyledTableCell>
                  <StyledTableCell>Nombres</StyledTableCell>
                  <StyledTableCell align="center">Apellidos</StyledTableCell>
                  <StyledTableCell align="center">Fecha Modificacion</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Registro</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages?.map((item, index) => (
                  <TableRow hover sx={{ cursor: "pointer" }} key={index}>
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


    </>
  )
}
