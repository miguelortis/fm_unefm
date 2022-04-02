import React, { lazy } from 'react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import Socket from '../../components/Socket'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Account = () => {
  const {
    state: { currentUser },
  } = useContext(Context)
  console.log(currentUser)
  Socket.emit('connection', 'hola soy pedro')
  const tableExample = [
    {
      notifications: {
        message: 'Tienes una cita pautada para el dia miercoles 30 de Marzo 2022',
        date: 'Lunes 21 de Marzo, 2022',
      },
    },
    {
      notifications: {
        message: 'Tienes una cita pautada para el dia miercoles 30 de Marzo 2022',
        date: 'Martes 22 de Marzo, 2022',
      },
    },
    {
      notifications: {
        message: 'Tienes una cita pautada para el dia miercoles 30 de Marzo 2022',
        date: 'Miercoles 23 de Marzo, 2022',
      },
    },
    {
      notifications: {
        message: 'Tienes una cita pautada para el dia miercoles 30 de Marzo 2022',
        date: 'Jueves 24 de Marzo, 2022',
      },
    },
    {
      notifications: {
        message: 'Tienes una cita pautada para el dia miercoles 30 de Marzo 2022',
        date: 'Viernes 25 de Marzo, 2022',
      },
    },
  ]

  return (
    <>
      <WidgetsBrand />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>{currentUser?.name}</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Avisos</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.notificacions}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.notifications.message}</span>
                          Publicado: {item.notifications.date}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Account
