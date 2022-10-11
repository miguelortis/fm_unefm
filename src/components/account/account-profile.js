import React, {useContext} from 'react';
import {
  Avatar,
  Box,
  Button,
  Paper,
  styled,
  Divider,
  Typography
} from '@mui/material';
import { Context } from 'src/contexts/Context';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const AccountProfile = (props) => {
  const {state: {currentUser}} = useContext(Context)
 
  const onChange = () => {

  }
  return(
  <Item {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 124,
            mb: 2,
            width: 124
          }}
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {currentUser?.name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
        >
          {`${currentUser?.lastName.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`(${currentUser?.idCard})`}
        </Typography>
      </Box>
    <Divider />
      <Button 
        color="primary"
        fullWidth
        variant="text"
        component="label">
        Subir foto
        <input hidden accept="image/*" multiple type="file" onChange={onChange}/>
      </Button>
  </Item>
)};
