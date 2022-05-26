
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Autocomplete,
  FormControl,
  InputLabel,

} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment'
import { styled, alpha } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios'
import { DesktopDatePicker } from '@mui/lab'
import { CheckBox, Close, CheckBoxOutlineBlank, Edit, Save } from '@mui/icons-material';

const option = [
  {
    label: '',
    options: [
    ],
  },
  {
    label: 'Usuario',
    options: [
      { title: 'Inicio', code: 1 },
      { title: 'Perfil', code: 2 },
      { title: 'Familiares', code: 3 },
    ],
  },
  {
    label: 'Beneficiarios',
    options: [
      { title: 'Panel Administrativo (titulo)', code: 4 },
      { title: 'Servicios', code: 5 },
    ],
  },
  {
    label: 'Medico General',
    options: [
      { title: 'Panel Administrativo (titulo)', code: 4 },
      { title: 'Consultas Pendientes', code: 6 },
    ],
  },
  {
    label: 'Medico Emergencia',
    options: [
      { title: 'Panel Administrativo (titulo)', code: 4 },
      { title: 'Consultas Pendientes', code: 7 },
    ],
  },
  {
    label: 'Master',
    options: [
      { title: 'Inicio', code: 1 },
      { title: 'Perfil', code: 2 },
      { title: 'Familiares', code: 3 },
      { title: 'Administrar de Usuarios', code: 11 },
    ],
  },

];


const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -15,
    top: -5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

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


const columns = [
  { id: 'idCard', label: 'Cedula' },
  { id: 'name', label: 'Nombres' },
  {
    id: 'lastName',
    label: 'Apellidos',
  },
  {
    id: 'ModificationDate',
    label: 'Fecha Modificacion',
    align: 'right',
    format: (value) => moment(value).format('DD MMM YYYY'),
  },
  {
    id: 'registrationDate',
    label: 'Fecha Registro',
    align: 'right',
    format: (value) => moment(value).format('DD MMM YYYY'),
  },
];
export default function AdminTitulares() {
  // const {
  //   dispatch,
  // } = useContext(Context)
  const [titulares, setTitulares] = useState([])
  const [search, setSearch] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false)
  const [editEnable, setEditEnable] = useState(null);
  const [saveData, setSaveData] = useState({});
  const [role, setRole] = useState(0);
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
        setSearch(data)
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const updateData = async () => {
    setShowSpinner(true)
    if (Object.entries(saveData).length === 0 ||
      saveData.idCard === "" ||
      saveData.name === "" ||
      saveData.lastName === "" ||
      saveData.sex === "" ||
      saveData.civilStatus === "" ||
      saveData.email === "" ||
      saveData.phone === "" ||
      saveData.personalType === "" ||
      saveData.dateBirth === "" ||
      saveData.role === "" ||
      saveData.category === "") {

      alert("debe llenar el campo")
      setShowSpinner(false)
    } else {
      const updateUser = { data: saveData, id: dataEdit._id }
      try {
        const { data } = await axios.put(
          'https://servidor-fmunefm.herokuapp.com/user_update',
          updateUser,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        //console.log(data.status)
        if (data.status === 201) {
          console.log(data.message)
          console.log(data.res)
          setEditEnable(null)
          setRole(0)
          setSaveData({})
          setTitulares(titulares.map(titular => titular._id === data.res._id ? data.res : titular))
          setSearch(titulares.map(titular => titular._id === data.res._id ? data.res : titular))
          setDataEdit(data.res)
          // dispatch({
          //   type: 'SET_ EXCHANGE-RATE',
          //   payload: data.exchangeRates,
          // })
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
  }
  const handleEdit = (row) => {
    setOpen(true)
    setDataEdit(row)
    // setElement({ ...row })
  }
  const handleClose = () => {
    setOpen(false);
  };
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
                TITULARES
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => {
                    setSearch(titulares?.filter(titular => titular.idCard.includes(e.target.value)))
                  }}
                  placeholder="Buscar..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <CardContent>
          <TableContainer component={Paper}>
            <Table stickyHeader size={'small'}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody>
                {search
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell sx={{ cursor: "pointer" }} onClick={() => handleEdit(row)} key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 50]}
            component="div"
            count={search.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        </CardContent>
      </Card>
      { /*///////// MODIFICAR TITULAR /////////*/}
      <div>
        <Dialog
          open={open}
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
            <StyledBadge color={dataEdit.status === 3 ? 'info' : dataEdit.status === 2 ? 'warning' : 'success'} badgeContent={dataEdit.status === 3 ? 'No Verificado' : dataEdit.status === 2 ? 'Suspendido' : 'Activo'}>
              <span>{`Modificar Titular ${dataEdit?.name}`}</span>
            </StyledBadge >
          </DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Parametro</StyledTableCell>
                      <StyledTableCell sx={{ minWidth: "230px" }}>Valor</StyledTableCell>
                      <StyledTableCell align="center" sx={{ minWidth: "100px" }}>Accion</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>Cedula</TableCell>
                      <TableCell>
                        {editEnable !== 1 && dataEdit?.idCard}
                        <TextField
                          hidden={editEnable === 1 ? false : true}
                          label="Cedula"
                          variant="standard"
                          id="idCard"
                          type="number"
                          defaultValue={!saveData.idCard ? dataEdit.idCard : saveData.idCard}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, idCard: e.target.value.replace(/\./g, '')
                            })
                            console.log(saveData, "cedula")
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(1)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 1 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 1 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Nombres</TableCell>
                      <TableCell >
                        {editEnable !== 2 && dataEdit?.name}
                        <TextField
                          hidden={editEnable === 2 ? false : true}
                          label="Nombres"
                          variant="standard"
                          id="name"
                          type="text"
                          defaultValue={!saveData.name ? dataEdit.name : saveData.name}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, name: e.target.value.toUpperCase()
                            })
                            console.log(saveData)
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(2)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 2 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 2 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Apellidos</TableCell>
                      <TableCell >
                        {editEnable !== 3 && dataEdit?.lastName}
                        <TextField
                          hidden={editEnable === 3 ? false : true}
                          label="Apellidos"
                          variant="standard"
                          id="lastName"
                          type="text"
                          defaultValue={!saveData.lastName ? dataEdit.lastName : saveData.lastName}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, lastName: e.target.value.toUpperCase()
                            })
                            console.log(saveData)
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(3)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 3 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 3 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Sexo</TableCell>
                      <TableCell>
                        {editEnable !== 4 && dataEdit?.sex}
                        <Select
                          hidden={editEnable === 4 ? false : true}
                          variant="standard"
                          id="sex"
                          defaultValue={!saveData.sex ? dataEdit.sex : saveData.sex}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, sex: e.target.value
                            })
                            console.log(saveData)
                          }}
                        >
                          <MenuItem value="MASCULINO">
                            Masculino
                          </MenuItem>
                          <MenuItem value="FEMENINO">
                            Femenino
                          </MenuItem>

                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(4)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 4 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 4 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Estado civil</TableCell>
                      <TableCell>
                        {editEnable !== 5 && dataEdit?.civilStatus}
                        <Select
                          hidden={editEnable === 5 ? false : true}
                          variant="standard"
                          id="civilStatus"
                          defaultValue={!saveData.civilStatus ? dataEdit.civilStatus : saveData.civilStatus}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, civilStatus: e.target.value
                            })
                            console.log(saveData)
                          }}
                        >
                          <MenuItem value="SOLTERO">
                            Soltero/a
                          </MenuItem>
                          <MenuItem value="CASADO">
                            Casado/a
                          </MenuItem>
                          <MenuItem value="DIVORCIADO">
                            Divorciado/a
                          </MenuItem>
                          <MenuItem value="VIUDO">
                            Viudo/a
                          </MenuItem>
                          <MenuItem value="OTRO">
                            Otro
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(5)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 5 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 5 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Correo</TableCell>
                      <TableCell>
                        {editEnable !== 6 && dataEdit?.email}
                        <TextField
                          hidden={editEnable === 6 ? false : true}
                          label="Email"
                          variant="standard"
                          id="email"
                          type="email"
                          defaultValue={!saveData.email ? dataEdit.email : saveData.email}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, email: e.target.value.toUpperCase()
                            })
                            console.log(saveData)
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(6)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 6 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 6 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Telefono</TableCell>
                      <TableCell>
                        {editEnable !== 7 && dataEdit?.phone}
                        <TextField
                          hidden={editEnable === 7 ? false : true}
                          label="Email"
                          variant="standard"
                          id="email"
                          type="email"
                          defaultValue={!saveData.phone ? dataEdit.phone : saveData.phone}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, phone: e.target.value
                            })
                            console.log(saveData)
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(7)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 7 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 7 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Tipo de personal</TableCell>
                      <TableCell>
                        {editEnable !== 8 && dataEdit?.personalType}
                        <Select
                          hidden={editEnable === 8 ? false : true}
                          variant="standard"
                          id="personalType"
                          defaultValue={!saveData.personalType ? dataEdit.personalType : saveData.personalType}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, personalType: e.target.value
                            })
                            console.log(saveData)
                          }}
                        >
                          <MenuItem value="FIJO">
                            Fijo
                          </MenuItem>
                          <MenuItem value="CONTRATADO">
                            Contratado
                          </MenuItem>
                          <MenuItem value="JUBILADO">
                            Jubilado
                          </MenuItem>

                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(7)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 8 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 8 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Categoria</TableCell>
                      <TableCell>
                        {editEnable !== 9 && dataEdit?.category}
                        <Select
                          hidden={editEnable === 9 ? false : true}
                          variant="standard"
                          id="category"
                          defaultValue={!saveData.category ? dataEdit.category : saveData.category}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, category: e.target.value
                            })
                            console.log(saveData)
                          }}
                        >
                          <MenuItem value="DOCENTE">
                            Docente
                          </MenuItem>
                          <MenuItem value="ADMINISTRATIVO">
                            Administrativo
                          </MenuItem>
                          <MenuItem value="OBRERO">
                            Obrero
                          </MenuItem>

                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(9)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 9 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 9 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Fecha Nacimiento</TableCell>
                      <TableCell>
                        {editEnable !== 10 && moment(dataEdit?.dateBirth).format('D-MM-YYYY')}
                        <DesktopDatePicker
                          id="dateBirth"
                          label="Fecha de Nacimiento"
                          inputFormat="DD/MM/YYYY"
                          defaultValue={!saveData.dateBirth ? dataEdit.dateBirth : saveData.dateBirth}
                          onChange={(e) => {
                            setSaveData({
                              ...saveData, dateBirth: e.target.value
                            })
                            console.log(saveData)
                          }}
                          renderInput={(params) => (
                            <TextField {...params} hidden={editEnable === 10 ? false : true} variant="standard" />
                          )}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(10)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 10 ? false : true} size="small" onClick={updateData}>
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 10 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})
                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>Rol</TableCell>
                      <TableCell>
                        {editEnable !== 11 && dataEdit?.role?.name}
                        <FormControl hidden={editEnable === 11 ? false : true} variant="filled" sx={{ width: '100%' }}>
                          <InputLabel id='role'>Seleccione un Rol</InputLabel>
                          <Select
                            variant="standard"
                            id="role"
                            value={role}
                            onChange={(e) => {
                              setRole(e.target.value)
                              setSaveData({})
                            }}
                          >

                            {option?.map((item, index) => {
                              return <MenuItem key={index} value={index}>{item.label}</MenuItem>
                            })}

                          </Select>
                        </FormControl>
                        <Autocomplete
                          disabled={role > 0 ? false : true}
                          hidden={editEnable === 11 ? false : true}
                          multiple
                          value={saveData?.role?.options.length > 0 ? saveData?.role?.options : []}
                          limitTags={3}
                          id="checkboxes-tags-demo"
                          onChange={(e, v) => {
                            console.log(v)
                            setSaveData({
                              role: {
                                name: option[role]?.label, options: v
                              }
                            })
                            console.log(saveData)
                          }}
                          options={option[role]?.options}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.title}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.title}
                            </li>
                          )}
                          style={{ width: "100%", marginTop: "15px" }}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Seleccione las Opciones" />
                          )}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" hidden={editEnable === null ? false : true} onClick={() => setEditEnable(11)} size="small">
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 11 ? false : true} onClick={updateData} size="small">
                          <Save fontSize="small" />
                        </IconButton>
                        <IconButton color="primary" hidden={editEnable === 11 ? false : true} onClick={() => {
                          setEditEnable(null)
                          setRole(0)
                          setSaveData({})

                        }} size="small">
                          <Close fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button hidden={!showEdit} autoFocus>
              Guardar
            </Button>
            <Button hidden={showEdit} onClick={() => setShowEdit(true)}
              autoFocus>
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </>
  )
}
