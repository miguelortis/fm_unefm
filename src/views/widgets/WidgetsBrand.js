import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider, Grid, Tooltip } from '@mui/material';

const arrayCard = [
  {
    title: 'Plan',
    icon: <MedicalInformationIcon sx={{ width: 'auto', height: '70px', color: 'white' }} />,
    name: 'APS Plus',
    value: '10',
    bgcolor: 'rgb(81, 147, 247)',
    to: '/account',
  },
  {
    title: 'Familiares',
    icon: <PeopleAltOutlinedIcon sx={{ width: 'auto', height: '70px', color: 'white' }} />,
    value: '10',
    bgcolor: 'rgb(81, 247, 211)',
    to: '/beneficiaries',
  },
  {
    title: 'Deuda',
    icon: <MonetizationOnIcon sx={{ width: 'auto', height: '70px', color: 'white' }} />,
    value: '4$',
    bgcolor: 'rgb(139, 81, 247)',
    to: '/account',
  },
  {
    title: 'Example',
    icon: <AccessibilityIcon sx={{ width: 'auto', height: '70px', color: 'white' }} />,
    name: 'example',
    value: 'example',
    bgcolor: 'rgb(236, 97, 206)',
    to: '/account',
  }
]


export default function WidgetsBrand(withCharts) {
  WidgetsBrand.propTypes = {
    withCharts: PropTypes.object,
  }
  const history = useHistory()
  return (
    <>
      <Grid container spacing={2}>
        {arrayCard.map((card, index) => (
          <Grid item xs={12} sm={3} md={3} xl={3} key={index}>
            <Tooltip title='Detalles' arrow>
              <Card >
                <CardActionArea onClick={() => history.push(card.to)}>
                  <CardMedia
                    color={card.bgcolor}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', bgcolor: card.bgcolor }}
                    alt="Plan de salud"
                  >
                    {card.icon}
                  </CardMedia>
                  <Divider />
                  <CardContent sx={{
                    maxHeight: '110px', height: '100vh', padding: '12px', maxHeight: '85px', height: '100vh', textAlign: 'center'
                  }}>
                    <Typography sx={{ mb: 0, lineHeight: 1.3 }} gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Divider sx={{ mb: '5px' }} />
                    <Typography sx={{ mb: 0, lineHeight: 1.3 }} gutterBottom variant="overline" component="div">
                      {card.name}
                    </Typography>
                    <Typography sx={{ mb: 0, lineHeight: 1.3 }} variant="body2" color="text.secondary">
                      {card.value}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
}