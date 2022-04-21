import React, { useState } from 'react'
import verify from '../../assets/icons/usuarioVerificado.png'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import { Button, ButtonGroup } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import {
  DisplaySettings,
  MedicalServices,
  PersonalVideo,
  ContactPage,
  Person,
  Group,
} from '@mui/icons-material'
import { CSpinner } from '@coreui/react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardTitle,
  CCollapse,
  CRow,
  CSmartTable,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
// import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Typography,
  Toolbar,
  Tooltip,
  Zoom,
  Chip,
  Avatar,
  Menu,
} from '@mui/material'
import ServiceRequest from '../servicerequest/ServiceRequest'
import ServicePanel from 'src/components/servicepanel/ServicePanel'

export default function ConsultaAfiliados() {
  const {
    state: { dataTotal, currentUser },
  } = useContext(Context)
  const [details, setDetails] = useState([])
  const [data, setData] = useState([])
  const [showUB, setShowUB] = useState('Titulares y Familiares')
  const [openService, setOpenService] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [component, setComponent] = useState({})
  if (
    (!!localStorage.getItem('token') && currentUser?.role === 'user') ||
    currentUser?.role === ''
  ) {
    return <Redirect to="/unauthorised" />
  }

  //console.log(dataTotal)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleBeneficiaries = () => {
    setData(dataTotal?.Beneficiaries)
    setShowUB('Familiares')
  }
  const handleUsers = () => {
    setData(dataTotal?.Users)
    setShowUB('Titulares')
  }

  const columns = [
    {
      label: 'Nombre',
      key: 'name',
      _style: { width: '40%' },
    },
    {
      label: 'Cedula',
      key: 'idCard',
      _style: { width: '40%' },
    },
    { label: 'Estado', key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: 'Accion',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case true:
        return <img src={verify} alt="" />
      case false:
        return <CSpinner color="info" />

      default:
        return <CSpinner color="info" />
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="info">
          <Toolbar>
            <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
              {showUB}
            </Typography>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem
                  key="1"
                  onClick={() => {
                    handleUsers()
                    handleCloseNavMenu()
                  }}
                >
                  <Person />
                  <Typography textAlign="center">Titulares</Typography>
                </MenuItem>
                <MenuItem
                  key="2"
                  onClick={() => {
                    handleBeneficiaries()
                    handleCloseNavMenu()
                  }}
                >
                  <Group />
                  <Typography textAlign="center">Familiares</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" onClick={handleUsers}>
                <Chip
                  style={{ cursor: 'pointer' }}
                  color="primary"
                  label="Titulares"
                  avatar={<Avatar>{dataTotal?.Users?.length}</Avatar>}
                />
              </Button>
              <Button color="inherit" onClick={handleBeneficiaries}>
                <Chip
                  style={{ cursor: 'pointer' }}
                  color="primary"
                  label="Familiares"
                  avatar={<Avatar>{dataTotal?.Beneficiaries?.length}</Avatar>}
                />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <br />

      {data?.length > 0 && (
        <CSmartTable
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          items={data}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            name: (item) => (
              <td>
                <Tooltip
                  TransitionComponent={Zoom}
                  title={
                    item?.userId
                      ? ` Familiar de ${
                          item?.userId?.length >= 3
                            ? `${item?.userId.length} Usuarios`
                            : item?.userId?.map((el) => el.name)
                        }`
                      : item?.beneficiaries?.length === 0
                      ? 'Titular sin carga familiar'
                      : `Titular de ${
                          item?.beneficiaries?.length >= 3
                            ? `${item?.beneficiaries?.length} Familiares`
                            : item?.beneficiaries?.map((el) => el?.beneficiary?.name)
                        }`
                  }
                  placement="top"
                >
                  <h5> {item?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())} </h5>
                </Tooltip>
              </td>
            ),
            idCard: (item) => (
              <td>
                <h6>
                  {item?.documentType?.toUpperCase()}
                  {'-'}
                  {item?.idCard}{' '}
                </h6>
              </td>
            ),
            status: (item) => (
              <td>
                <Tooltip
                  TransitionComponent={Zoom}
                  title={
                    item?.status
                      ? 'Verificado'
                      : 'En espera. Por favor, llevar documentos a la oficina principal del fondo mutual para su verificacion'
                  }
                  placement="top"
                  //trigger="hover"
                >
                  <CBadge>{getBadge(item?.status)}</CBadge>
                </Tooltip>
              </td>
            ),
            show_details: (item) => {
              return (
                <td>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Tooltip title="Historial" placement="top">
                        <Button
                          onClick={() => {
                            toggleDetails(item?._id)
                          }}
                        >
                          {details.includes(item?._id) ? <PersonalVideo /> : <DisplaySettings />}
                        </Button>
                      </Tooltip>
                      <Tooltip title="Informacion del Usuario" placement="top">
                        <Button
                          onClick={() => {
                            toggleDetails(item?._id)
                          }}
                        >
                          <ContactPage />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Servicios" placement="top">
                        <Button
                          onClick={() => {
                            setOpenService(true)
                            setComponent(<ServicePanel item={item} />)
                          }}
                        >
                          <MedicalServices />
                        </Button>
                      </Tooltip>
                    </ButtonGroup>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <ButtonGroup
                      orientation="vertical"
                      aria-label="vertical contained button group"
                      variant="contained"
                    >
                      <Tooltip title="Historial" placement="top">
                        <Button
                          onClick={() => {
                            toggleDetails(item?._id)
                          }}
                        >
                          {details.includes(item?._id) ? <PersonalVideo /> : <DisplaySettings />}
                        </Button>
                      </Tooltip>
                      <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <MenuIcon />
                      </Button>
                    </ButtonGroup>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        'aria-labelledby': 'fade-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      onClose={handleClose}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose()
                        }}
                      >
                        <ContactPage />
                        <Typography textAlign="center">Informacion de Usuario</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setOpenService(true)
                          setComponent(
                            <ServicePanel
                              item={item}
                              setOpenService={setOpenService}
                              openService={openService}
                            />,
                          )
                          handleClose()
                        }}
                      >
                        <MedicalServices />
                        <Typography textAlign="center">Servicios</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </td>
              )
            },
            details: (item) => {
              return (
                <CRow>
                  <CCollapse visible={details.includes(item?._id)}>
                    <CCard>
                      <CCardBody>
                        <CCardTitle
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <br />
                          {item?.userId
                            ? 'Pertenece a la carga familiar de:'
                            : item?.beneficiaries?.length === 0
                            ? 'No posee Carga Familiar'
                            : 'Carga Familiar'}
                        </CCardTitle>
                        <CTable
                          hidden={
                            item?.beneficiaries
                              ? item?.beneficiaries.length === 0
                                ? true
                                : false
                              : item?.userId.length === 0
                              ? true
                              : false
                          }
                          hover
                        >
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Nº</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Cedula</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Apellido</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Parentesco</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {/* ////////////Beneficiariy///////////// */}
                            {item?.userId &&
                              item?.userId?.map((el, index) => (
                                <CTableRow key={index}>
                                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                  <CTableDataCell>
                                    {el?.user?.documentType}
                                    {el?.user?.idCard}
                                  </CTableDataCell>
                                  <CTableDataCell>{el?.user?.name}</CTableDataCell>
                                  <CTableDataCell>{el?.user?.lastName}</CTableDataCell>
                                  <CTableDataCell>
                                    {el?.relationship === 'HIJO' && el?.user?.sex === 'MASCULINO'
                                      ? 'Padre'
                                      : el?.relationship === 'HIJO' && el?.user?.sex === 'FEMENINO'
                                      ? 'Madre'
                                      : el?.relationship === 'PADRE' || el?.relationship === 'MADRE'
                                      ? 'Hijo'
                                      : 'Conyuge'}
                                  </CTableDataCell>
                                </CTableRow>
                              ))}
                            {/*///////////////User /////////////// */}
                            {item?.beneficiaries &&
                              item?.beneficiaries?.map((el, index) => (
                                <CTableRow key={index}>
                                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                  <CTableDataCell>
                                    {el?.beneficiary?.documentType}
                                    {el?.beneficiary?.idCard}
                                  </CTableDataCell>
                                  <CTableDataCell>{el?.beneficiary?.name}</CTableDataCell>
                                  <CTableDataCell>{el?.beneficiary?.lastName}</CTableDataCell>
                                  <CTableDataCell>{el?.relationship}</CTableDataCell>
                                </CTableRow>
                              ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CCollapse>
                </CRow>
              )
            },
          }}
          sorterValue={{ column: 'name', state: 'asc' }}
          tableFilter
          tableFilterPlaceholder="Buscar"
          tableFilterLabel=""
          tableHeadProps={{
            color: 'info',
          }}
          tableProps={{
            align: 'middle',
            responsive: false,
            color: 'light',
            hover: true,
          }}
        />
      )}
      <ServiceRequest
        openService={openService}
        setOpenService={setOpenService}
        component={component}
      />
    </>
  )
}
