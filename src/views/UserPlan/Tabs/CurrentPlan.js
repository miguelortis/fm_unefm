import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {ArrowCircleDown, ArrowDownward} from '@mui/icons-material';
import { Box, Paper, Grid, styled, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Tooltip } from '@mui/material'
import { Context } from 'src/contexts/Context';
import getPackage from 'src/utils/getPackage';
import message from 'src/components/commons/message';
import Empty from 'src/components/commons/Empty/Empty';
import getRate from 'src/utils/getRate';
import Loading from 'src/components/commons/Loading';
import NotAvailable from 'src/components/commons/NotAvailable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CurrentPlan({currentPackage, setCurrentPackage}) {
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(null)
  const  currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    
  }, [])
  
  
  useEffect(() => {
    const fetchData = async()=>{
      setLoading(true)
      const res = await getPackage(currentUser?._id)
      if(res?.status === 200){
        setLoading(false)
        setCurrentPackage(res.data.content)
      }else if(res?.status === 204){
        setLoading(false)
        setCurrentPackage(null)
      }else{
        message.error('Ocurrio un problema al cargar los datos de su plan')
      }
    }
    fetchData()
  }, [currentUser])
  useEffect(() => {
    const fetchData = async()=>{
      const res = await getRate('USD')
      if(res?.status === 200){
        setRate(res.data.content)
      }else if(res?.status === 204){
        setRate(null)
      }else{
        message.error('Ocurrio un problema al obtener la tasa del USD')
      }
    }
    fetchData()
  }, [])

    const rows = [
      {monthlyPrice: currentPackage?.price, currency: rate?.currency},
      {monthlyPrice: rate?.price * currentPackage?.price , currency: 'BS'},
      {monthlyPrice: 0, currency: '₽'},

    ]

    const handleClick = () => {

      const DinamicTable = () => {
        
        return (
          <div>
            <TableContainer>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Tipo</TableCell>
                    <TableCell align="left">Consultas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPackage?.services?.map((item, i) => (
                        <TableRow
                          key={i + 's'}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{item?.service?.name}</TableCell>
                          <TableCell align="center"><b>{item?.frequency}</b></TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      } 

      dispatch({ type: 'SHOW_MODAL', payload: {open: true, title: 'Servicios', content: <DinamicTable/>} })
    }
    return(
      <>
        {loading && <Loading/>}
        {currentPackage === null && !loading && <Empty text='Actualmente sin plan'/>}
        {currentPackage !== null &&
        <>
          <Typography variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', mb: 1}}>
                {currentPackage?.name}
          </Typography>
          <Box> 
              <Grid container sx={{justifyContent: 'center', alignContent: 'stretch'}}>
                <Grid item xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                  <Item sx={{width: '100%'}}>
                        <Typography variant="h6" component="div">
                          Precio
                        </Typography>
                        <TableContainer>
                          <Table size="small" aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Mensual</TableCell>
                                <TableCell align="left">Anual</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow
                                  key={row?.currency}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell style={{textAlignLast: 'justify'}} align="left"><b>{parseFloat(row?.monthlyPrice).toFixed(2).replace('.', ',')}</b> {row?.currency} </TableCell>
                                  <TableCell style={{textAlignLast: 'justify'}} align="left"><b>{parseFloat(row?.monthlyPrice * 12).toFixed(2).replace('.', ',')}</b> {row?.currency} </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                  </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                  <Item sx={{width: '100%'}}>
                        <Typography variant="h6" component="div">
                          Servicios
                        </Typography>
                        <TableContainer>
                          <Table size="small" aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Tipo</TableCell>
                                <TableCell align="left">Consultas</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {currentPackage?.services?.map((item, i) => {
                                if(i <= 2){
                                  return(
                                    <TableRow
                                      key={i + item?.service?.name}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell align="left">{item?.service?.name}</TableCell>
                                      <TableCell align="center"><b>{item?.frequency}</b></TableCell>
                                    </TableRow>
                                  )
                                }
                              })}
                              {currentPackage?.services?.length > 2 && 
                              <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell colSpan={2} align="center">
                                  <Tooltip title='Mas informacion' placement="top">
                                    <IconButton onClick={handleClick} ><ArrowDownward/></IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                              }
                            </TableBody>
                          </Table>
                        </TableContainer>
                  </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                  <Item sx={{width: '100%'}}>
                        <Typography variant="h6" component="div">
                          Informacion extra
                        </Typography>
                        {/* <TableContainer>
                          <Table size="small" aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Mensual</TableCell>
                                <TableCell align="left">Anual</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, i) => (
                                <TableRow
                                  key={row?.currency + i}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell style={{textAlignLast: 'justify'}} align="left"><b>{parseFloat(row?.monthlyPrice).toFixed(2).replace('.', ',')}</b> {row?.currency} </TableCell>
                                  <TableCell style={{textAlignLast: 'justify'}} align="left"><b>{parseFloat(row?.monthlyPrice * 12).toFixed(2).replace('.', ',')}</b> {row?.currency} </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer> */}
                        <NotAvailable/>
                  </Item>
                </Grid>
              </Grid>
          </Box> 
        </>}
    </>
    )
}

CurrentPlan.propTypes = {
  currentPackage: PropTypes.object,
  setCurrentPackage: PropTypes.func,
}