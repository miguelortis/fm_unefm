import React, { useState, useEffect } from 'react'
import ExportExcel from 'react-export-excel'

import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CSpinner,
  CTableBody,
  CTable,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilX, cilSettings, cilTrash, cilUserPlus } from '@coreui/icons'
import ModalEditBeneficiary from '../components/ModalBeneficiary'
import {
  CCard,
  CCardBody,
  CCollapse,
  CContainer,
  CHeaderDivider,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'
import axios from 'axios'

export default function TableBeneficiaries() {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false)
  const [details, setDetails] = useState([])
  const [visible, setVisible] = useState(false)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  const ExcelFile = ExportExcel.ExcelFile
  const ExcelSheet = ExportExcel.ExcelSheet
  const ExcelColumn = ExportExcel.ExcelColumn

  useEffect(() => {
    const handleReport = async () => {
      try {
        setLoading(false)
        const { data } = await axios.get('https://servidor-fmunefm.herokuapp.com/report')
        console.log('data', data)
        setReport(data)
        if (data) {
          setLoading(true)
        }
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    }

    handleReport()
  }, [])

  //console.log(report)
  const handleModalEditBeneficiary = () => {
    setVisibleModalEdit(!visibleModalEdit)
  }
  //console.log(currentUser)

  const columns = [
    {
      label: 'Nombre',
      key: 'name',
      _style: { width: '40%' },
    },
    {
      label: 'Apellido',
      key: 'lastName',
      _style: { width: '40%' },
    },
    {
      label: 'Cedula',
      key: 'cedula',
      _style: { width: '40%' },
    },
    { label: 'Categoria', key: 'categoria', _style: { width: '20%' } },
    { label: 'Plan', key: 'categoria', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: 'Opciones',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  return (
    <>
      <CNavbar expand="lg" colorScheme="dark" className="bg-dark">
        <CContainer fluid>
          <CNavbarBrand>Carga Familiar</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />

          <CCollapse className="navbar-collapse justify-content-end" visible={visible}>
            <CNavbarNav className="justify-content-end">
              <CNavItem>
                <ExcelFile
                  element={
                    <CButton color="dark" style={{ cursor: 'pointer' }} active>
                      <CIcon size="lg" icon={cilUserPlus} />
                      Agregar Familiar
                    </CButton>
                  }
                  filename="Reporte Titulares Fmunefm"
                >
                  <ExcelSheet data={report} name="Titulares">
                    <ExcelColumn label="Tipo" value="tipodocument" />
                    <ExcelColumn label="Cedula" value="cedula" />
                    <ExcelColumn label="Nombre" value="name" />
                    <ExcelColumn label="Apellido" value="lastName" />
                    <ExcelColumn label="Apellido" value="afiliados, cedula" />
                  </ExcelSheet>
                  {/* <ExcelSheet data={report?.afiliados} name="Beneficiarios">
                    <ExcelColumn label="Cedula Titular" value="idCard" />
                    <ExcelColumn label="Nombre Titular" value="name" />
                    <ExcelColumn label="Cedula" value="cedula" />
                    <ExcelColumn label="Nombre" value="nombre" />
                    <ExcelColumn label="Fecha de nacimiento" value="fecha" />
                    <ExcelColumn label="Parentesco" value="parentesco" />
                  </ExcelSheet> */}
                </ExcelFile>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>

      <CHeaderDivider></CHeaderDivider>
      <CSmartTable
        activePage={3}
        cleaner
        clickableRows
        columns={columns}
        items={report}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          name: (item) => (
            <td>
              <h5>{item.name.replace(/\b\w/g, (l) => l.toUpperCase())} </h5>
            </td>
          ),
          cedula: (item) => (
            <td>
              <h6>
                {item?.tipodocument.toUpperCase()}
                {'-'}
                {item?.cedula}{' '}
              </h6>
            </td>
          ),

          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="info"
                  //variant="outline"
                  //shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.cedula)
                  }}
                >
                  {details.includes(item.cedula) ? (
                    <CIcon icon={cilX} size="lg" />
                  ) : (
                    <CIcon icon={cilMenu} size="lg" />
                  )}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CRow>
                <CCollapse visible={details.includes(item.cedula)}>
                  <CCard>
                    {/* <CCardHeader component="h5">Header</CCardHeader> */}
                    <CCardBody>
                      <CTable hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Nº</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Cedula</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Fecha de Nac</CTableHeaderCell>
                            <CTableHeaderCell scope="col">parentesco</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>

                        <CTableBody>
                          {item?.afiliados?.map((el, index) => (
                            <CTableRow key={index}>
                              <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                              <CTableDataCell>
                                {el.tipoDocumento}
                                {el.cedula}
                              </CTableDataCell>
                              <CTableDataCell>{el.nombre}</CTableDataCell>
                              <CTableDataCell>{el.fecha}</CTableDataCell>
                              <CTableDataCell>{el.parentesco}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>

                      <CButton
                        onClick={() => handleModalEditBeneficiary(item)}
                        size="lg"
                        color="light"
                        shape="rounded-pill"
                      >
                        <CIcon icon={cilSettings} size="xxl" />
                      </CButton>
                      <CButton size="lg" color="light" shape="rounded-pill">
                        <CIcon icon={cilTrash} size="xxl" />
                      </CButton>
                    </CCardBody>
                  </CCard>
                </CCollapse>
              </CRow>
            )
          },
        }}
        sorterValue={{ column: 'name', state: 'asc' }}
        tableFilter
        tableFilterPlaceholder="Buscar"
        tableFilterLabel=""
        tableHeadProps={{
          color: 'info',
        }}
        tableProps={{
          align: 'middle',
          responsive: true,
          color: 'light',
          hover: true,
        }}
      />
      <div hidden={loading} style={{ width: '100%', textAlignLast: 'center' }}>
        <CSpinner color="info" />
      </div>
      <ModalEditBeneficiary
        setVisibleModalEdit={setVisibleModalEdit}
        visibleModalEdit={visibleModalEdit}
      />
    </>
  )
}
