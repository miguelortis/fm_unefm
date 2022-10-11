import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { AppointmentsListResults } from '../../components/appointments/AppointmentsListResults';
import { AppointmentsListToolbar } from '../../components/appointments/AppointmentsListToolbar';
//import { DashboardLayout } from '../components/dashboard-layout';
//import { customers } from '../__mocks__/customers';
const customers = [
  {
    id: 1,
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097'
  },
  {
    id: 2,
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711'
  },
  {
    id: 3,
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: 1555016400000,
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682'
  },
  {
    id: 4,
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
  {
    id: 6,
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
  {
    id: 7,
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
  {
    id: 5,
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
]
const Appointments = () => {
  const [search, setSearch] = useState(customers)
  
  useEffect(() => {
    if(!search || search === []){
      setSearch(customers)
    }
  }, [search])
  
  return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <AppointmentsListToolbar setSearch={setSearch} customers={customers}/>
        <Box sx={{ mt: 3 }}>
          <AppointmentsListResults customers={search} />
        </Box>
      </Container>
    </Box>
  </>
)};

export default Appointments;
