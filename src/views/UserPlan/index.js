import React, { useEffect, useState } from 'react'
import PlanCards from "src/components/ProductCards/PlanCards";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs } from '@mui/material';
import { CurrentPlan } from './Tabs';
import './index.css'
import SwipeableViews from 'react-swipeable-views';
import getAllPackages from 'src/utils/getAllPackages/getAllPackages';

export default function UserPlan() {
  const [value, setValue] = useState(0);
  const [packages, setPackages] = useState([]);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getPackages = async()=>{
      const {data} = await getAllPackages()
      console.log('userPlan', data.content)
      setPackages(data.content)
    }
    getPackages()
  }, [])
    return(
    <>
      <Box className='container-tabs'>
        <TabContext value={`${value}`}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label='Plan actual'/>
            <Tab label='Historial de pagos'/>
            <Tab label='Ultima actualización'/>
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={(e)=>setValue(e)}
          >
            <TabPanel value={`${value}`} index={0} dir={theme.direction}>
              <CurrentPlan/>
            </TabPanel>
            <TabPanel value={`${value}`} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={`${value}`} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </TabContext>
      </Box>
      <div className='container-packages'>
              <PlanCards style={{background: '#fff'}} dataSource={packages} cardsToShow={2} onClick={()=>console.log('se ejecuto')}/>
      </div>
    </>
    )
}