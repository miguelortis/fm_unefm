import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PlanCards from "src/components/ProductCards/PlanCards";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, List, ListItem, ListItemText, Rating, Skeleton, Tabs } from '@mui/material';
import { CurrentPlan } from './Tabs';
import SwipeableViews from 'react-swipeable-views';
import getAllPackages from 'src/utils/getAllPackages/getAllPackages';
import { Context } from 'src/contexts/Context';
import Request from 'src/utils/Request';
import './index.css'
import message from 'src/components/commons/message';
import getPackage from 'src/utils/getPackage';
import NotAvailable from 'src/components/commons/NotAvailable';

export default function UserPlan() {
  const [value, setValue] = useState(0);
  const [allPackages, setAllPackages] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null)
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getPackages = async()=>{
      const {data} = await getAllPackages()
      console.log('userPlan', data.content)
      setAllPackages(data.content)
    }
    getPackages()
  }, [])

  const onCloseModal = () =>{
    dispatch({ type: 'SHOW_MODAL', payload: {title: '', open: false, content: null} })
  }

  const handleClick = (e) =>{
    let allUsers = 1200;
    let usersPerPlan = 590;
    let stars = 10;

    const onChangePackage = async() =>{
      dispatch({ type: 'SHOW_LOADING', payload: true })
      const res = await Request.put(`/packages/${e._id}/${currentUser._id}`)
        if(res.status === 200){
          const response = await getPackage(currentUser._id)
          setCurrentPackage(response.data.content)
          message.success('Solicitud enviada exitosamente')
          onCloseModal()
          dispatch({ type: 'SHOW_LOADING', payload: false })
        }else{
          message.error('Ocurrio un error al enviar la solicitud')
          dispatch({ type: 'SHOW_LOADING', payload: false })
        }
    }
    
    const InfoCard = () => {
      return(
        <div >
                  {e.name ? <Rating style={{zIndex: 100}} precision={0.1} readOnly name="customized-10" defaultValue={(usersPerPlan * stars / allUsers)} max={stars} /> : <Skeleton />}
                  <div className="card-price">
                    {e.name ? <span className='price'>{e.price === 0 ? 'Gratis' : e.price + '$' }</span> : <Skeleton />}
                  </div>
                <div className="card-content">
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {e.services && e.services.length > 0 && e.services.map((item, i) => (
                      <ListItem
                        key={i}
                        disableGutters
                      >
                        <ListItemText primaryTypographyProps={{display: 'flex', justifyContent: 'space-between'}} primary={<><span>{item.service.name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}</span><span><b>{item.frequency}</b></span></>} />
                      </ListItem>
                    ))}
                  </List>
                 
                  {!e.name && <Skeleton />}
                  {!e.name && <Skeleton />}
                </div>
                <div className='card-buttons'>
                  <Button onClick={onChangePackage}>Contratar</Button>
                  <Button onClick={onCloseModal}>Cancelar</Button>
                </div>
      </div>
      )
    }

    dispatch({ type: 'SHOW_MODAL', payload: {open: true, title: e.name, content: <InfoCard/>} })
  }
    return(
    <>
      <Box className='container-tabs'>
        <TabContext value={`${value}`}>
          <Tabs
            sx={{width: '69%'}}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label='Plan actual'/>
            <Tab label='Historial de pagos'/>
            {/* <Tab label='Ultima actualización'/> */}
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={(e)=>setValue(e)}
          >
            <TabPanel value={`${value}`} index={0} dir={theme.direction}>
              <CurrentPlan currentPackage={currentPackage} setCurrentPackage={setCurrentPackage}/>
            </TabPanel>
            <TabPanel value={`${value}`} index={1} dir={theme.direction}>
              <NotAvailable style={{height: '260px'}}/>
            </TabPanel>
            {/* <TabPanel value={`${value}`} index={2} dir={theme.direction}>
              Item Three
            </TabPanel> */}
          </SwipeableViews>
        </TabContext>
      </Box>
      <div className='container-packages'>
              <PlanCards style={{background: '#fff'}} dataSource={allPackages} cardsToShow={2} onClick={(e)=>handleClick(e)}/>
      </div>
    </>
    )
}