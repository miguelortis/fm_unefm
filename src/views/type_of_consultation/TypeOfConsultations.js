import React, { useState, useEffect } from 'react'
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
  Grid,
  IconButton,
  Badge,
} from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import DailyDatingHistory from './daily-dating-history/DailyDatingHistory'
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

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
    state: { consultations },
  } = useContext(Context)
  const [visibleModal, setVisibleModal] = useState(false)
  const [component, setComponent] = useState()
  const [search, setSearch] = useState('')
  const [resultSearch, setResultSearch] = useState([])
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  console.log(consultations)

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
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  return (
    <Card style={{ textAlign: 'center' }} sx={{ minWidth: 275 }}>
      <CardHeader title="Tipo de Consulta" />
      <Divider />
      <Grid container sx={{m: 0, mt: 1, minHeight: '460px', justifyContent: 'center', width: '100%'}}>
        <Grid item xs={6} md={6} lg={6}>
          <Card >
            <Typography variant="h6" component="h6">
              Seleccion de Paciente
            </Typography>
            <CardContent>
              <AppBar position="static">
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Badge badgeContent={4} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>

                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
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
              <List sx={{ maxHeight: '290px', overflowY: 'auto' }}>
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
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Card >
            <Typography variant="h6" component="h6">
              Consultas
            </Typography>
            <CardContent >
              <DailyDatingHistory />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Card>
  )
}
