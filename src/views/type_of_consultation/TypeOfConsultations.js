import React, { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import Consultafiliados from '../consultafiliados/Consultafiliados'
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Stack,
  InputBase,
  Typography,
  ListItemText,
  Divider,
  ListItem,
  List,
  Toolbar,
  Box,
  AppBar,
} from '@mui/material'
import Socket from '../../components/Socket'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import useIsConsultationsPending from '../../hooks/useIsConsultationsPending'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

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
}))

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}))

export default function TypeOfConsultations() {
  const {
    state: { consultations, currentUser },
    dispatch,
  } = useContext(Context)
  const [visibleModal, setVisibleModal] = useState(false)
  const [component, setComponent] = useState()
  const [search, setSearch] = useState('')
  const [resultSearch, setResultSearch] = useState([])

  //const [consultations, setConsultations] = useState([])
  console.log(consultations)
  let id = currentUser._id
  useEffect(() => {
    Socket.on(id, (Consultations) => {
      console.log(Consultations)
      dispatch({
        type: 'SET_CONSULTATIONS',
        payload: [...Consultations],
      })
      //setConsultations([...consultations])
    })

    return () => {
      Socket.off()
    }
  }, [consultations])

  useEffect(() => {
    if (search === '') {
      setResultSearch(consultations)
    }
  }, [search, consultations])

  const filtrarElementos = () => {
    var res = consultations.filter((item) => {
      if (item?.idCardPatient?.includes(search)) {
        return item
      }
    })
    setResultSearch(res)
  }

  const handleModal = (component) => {
    if (component === 'Personal-U') {
      setComponent(<Consultafiliados />)
      setVisibleModal(!visibleModal)
    }
    if (component === 'Cliente-E') {
      setComponent(<span>hola</span>)
      setVisibleModal(!visibleModal)
    }
  }
  return (
    <Card style={{ textAlign: 'center' }} sx={{ minWidth: 275 }}>
      <CardHeader title="Tipo de Servicio" />
      <CardContent style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => handleModal('Personal-U')} variant="contained">
            Personal Unefm
          </Button>
          <Button disabled onClick={() => handleModal('Cliente-E')} variant="contained">
            Clientes Externos
          </Button>
        </Stack>
      </CardContent>
      <Divider />
      <Card>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Consultas Pendientes
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar…"
                  name="busqueda"
                  value={search}
                  autoComplete="off"
                  onChange={(e) => {
                    setSearch(e.target.value)
                    filtrarElementos()
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {resultSearch.map((item, index) => (
              <React.Fragment key={index}>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      item.patientType === 'Titular'
                        ? item?.user?.name + ' ' + item?.user?.lastName
                        : item?.patient?.name + ' ' + item?.patient?.lastName
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.patientType === 'Titular'
                            ? item?.user?.documentType + item?.user?.idCard
                            : item?.patient?.documentType + item?.patient?.idCard}
                        </Typography>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                          Tipo de Consulta:{item.queryType}
                        </Typography>
                        <BorderLinearProgress
                          variant="determinate"
                          value={item.patientType === 'Titular' ? 50 : 80}
                        />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      <Modal setVisibleModal={setVisibleModal} visibleModal={visibleModal} component={component} />
    </Card>
  )
}
