import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import History from './history/History'
import Socket from '../../components/Socket'
import { Card } from '@mui/material'
import WidgetsBrand from '../widgets/WidgetsBrand.js'
import axios from 'axios'


//https://servidor-fmunefm.herokuapp.com/
const Account = () => {
  const [historys, setHistorys] = useState({SH: {history: []}, PH: {history: []}, TH: {history: []}})
  const [scrollBottom, setScrollBottom] = useState(false)
  const [value, setValue] = useState(null);
  const [params, setParams] = useState({IT: 1, IA: 0});
  const [showSpinner, setShowSpinner] = useState(false);
  const {
    state: { currentUser },
  } = useContext(Context)
  console.log('currentUser', currentUser)
  useEffect(() => {
    async function getHistory() {
      
      const limit = 5;
      let skip = 0, type = 'All';
      if (value === 0) {
        type = 'SH';
        skip = historys.SH.history.length;
      }else if(value === 1) {
        type = 'PH';
        skip = historys.PH.history.length;
      }else if(value === 2) {
        type = 'TH';
        skip = historys.TH.history.length;
      }else if(value === null) {
        type = 'ALL';
        skip = 0;
        setValue(0);
      } 
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_TEST_URL}/sinister/sinisters?skip=${skip}&type=${type}&limit=${limit}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setHistorys({...historys, SH: {...historys.SH, history:[ ...historys.SH.history, ...data.SH.history], IT: data.SH.IT}, PH: {...historys.PH, history:[ ...historys.PH.history, ...data.PH.history], IT: data.PH.IT}, TH: {...historys.TH, history:[ ...historys.TH.history, ...data.TH.history], IT: data.TH.IT}})
        setShowSpinner(false)
      } catch (error) {
        if(error){
          console.log(error)
          setShowSpinner(false)
        }
        
      }
    }
    if(scrollBottom && params.IA < params.IT ){
      setShowSpinner(true)
      getHistory()
    }
    
  }, [scrollBottom])
  useEffect(() => {
    Socket.emit('addUser', currentUser?._id, currentUser?.role)
    Socket.on('getUsers', (users) => {
      console.log(users)
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    })
  }, [currentUser])
  return (

    <>
      <WidgetsBrand withCharts={currentUser?.beneficiaries?.length} />

      <Card sx={{ mt: '20px' }}>
        <History setScrollBottom={setScrollBottom} data={historys} value={value} setValue={setValue} setParams={setParams} showSpinner={showSpinner}/>

      </Card>
    </>
  )
}

export default Account
