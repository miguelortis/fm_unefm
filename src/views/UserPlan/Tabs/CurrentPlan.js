import React, {useContext, useEffect} from 'react'
import { Box, Card, CardContent, CardHeader, Paper, Grid, styled, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Context } from 'src/contexts/Context';
import axios from 'axios';
import getAllPackages from 'src/utils/getAllPackages/getAllPackages';
import getPackage from 'src/utils/getPackage';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CurrentPlan() {
  const {
    state: { currentUser },
  } = useContext(Context)
  console.log(currentUser)
  useEffect(() => {
    const fetchData = async()=>{
      const { data } = getPackage()
      console.log(data)

      /* const { data } = await axios.get(`${process.env.REACT_APP_TEST_URL}/user/package/12345`)
      console.log(data) */
    }
    fetchData()
  }, [])
  
    const theme = useTheme();

    const rows = [
      {monthlyPrice: 3, currency: 'USD'},
      {monthlyPrice: 24, currency: 'BS'},
      {monthlyPrice: 1, currency: '₽'},

    ]
    return(
      <>
            <Typography variant="h5" component="div" sx={{display: 'flex', justifyContent: 'center', mb: 1}}>
              Word of the Day
            </Typography>
         <Box> 
            <Grid container xs={12} sm={12} md={12} sx={{justifyContent: 'center', alignContent: 'stretch'}}>
              <Grid xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                <Item sx={{width: '100%'}}>
                      <Typography variant="h6" component="div">
                        Precio
                      </Typography>
                      <TableContainer>
                        <Table size="small" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Mensual</TableCell>
                              <TableCell align="right">Anual</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.currency}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center"><b>{row.monthlyPrice}</b> {row.currency}</TableCell>
                                <TableCell align="center"><b>{row.monthlyPrice * 12}</b> {row.currency}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                </Item>
              </Grid>
              <Grid xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                <Item sx={{width: '100%'}}>
                      <Typography variant="h6" component="div">
                        Servicios
                      </Typography>
                      <TableContainer>
                        <Table size="small" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Tipo</TableCell>
                              <TableCell align="right">Uso Anual</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.currency}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center"><b>{row.monthlyPrice}</b> {row.currency}</TableCell>
                                <TableCell align="center"><b>{row.monthlyPrice * 12}</b> {row.currency}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                </Item>
              </Grid>
              <Grid xs={12} sm={4} md={3.5} sx={{ml: {md: 1}, mr: {md: 1}, display: 'flex'}}>
                <Item sx={{width: '100%'}}>
                      <Typography variant="h6" component="div">
                        Informacion extra
                      </Typography>
                      <TableContainer>
                        <Table size="small" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="right">Mensual</TableCell>
                              <TableCell align="right">Anual</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.currency}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center"><b>{row.monthlyPrice}</b> {row.currency}</TableCell>
                                <TableCell align="center"><b>{row.monthlyPrice * 12}</b> {row.currency}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                </Item>
              </Grid>
            </Grid>
         </Box> 
    </>
    )
}