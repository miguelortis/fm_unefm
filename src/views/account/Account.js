import React, { lazy } from 'react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import History from './history/History'
import Socket from '../../components/Socket'
import { Card, CardContent } from '@mui/material'



const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))
const Account = () => {
  const {
    state: { currentUser },
  } = useContext(Context)
  return (

    <>
      <WidgetsBrand withCharts={currentUser?.beneficiaries?.length} />

      <Card sx={{ mt: '20px' }}>
        <History />

      </Card>
    </>
  )
}

export default Account
