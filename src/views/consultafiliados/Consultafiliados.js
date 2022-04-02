import React, { useState } from 'react'
import verify from '../../assets/icons/usuarioVerificado.png'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import hijo from '../../assets/images/avatars/hijo.svg'
import hija from '../../assets/images/avatars/hija.svg'
import padre from '../../assets/images/avatars/padre.svg'
import madre from '../../assets/images/avatars/madre.svg'
import conyugeF from '../../assets/images/avatars/conyugeF.svg'
import conyugeM from '../../assets/images/avatars/conyugeM.svg'

import { CButton, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilX, cilSettings, cilTrash, cilUserPlus } from '@coreui/icons'
import ModalEditBeneficiary from '../../components/ModalEditBeneficiary'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CCollapse,
  CContainer,
  CHeaderDivider,
  CImage,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CRow,
  CSmartTable,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Modal from '../modal/Modal'

export default function TableBeneficiaries() {
  const {
    state: { dataTotal, currentUser },
  } = useContext(Context)

  const [visibleModalEdit, setVisibleModalEdit] = useState(false)
  const [details, setDetails] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)

  if (
    (!!localStorage.getItem('token') && currentUser?.role === 'user') ||
    currentUser?.role === ''
  ) {
    return <Redirect to="/unauthorised" />
  }

  console.log(dataTotal)
  const handleModalEditBeneficiary = () => {
    setVisibleModalEdit(!visibleModalEdit)
  }

  const deleteBeneficiary = async (idCard) => {
    try {
      console.log(idCard)

      const res = await axios.delete(
        `https://backend-fmunefm.herokuapp.com/beneficiary/delete/${idCard}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )

      console.log(res)
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  }
  ///console.log(currentUser)

  const columns = [
    {
      label: 'Nombre',
      key: 'name',
      _style: { width: '40%' },
    },
    {
      label: 'Cedula',
      key: 'idCard',
      _style: { width: '40%' },
    },
    { label: 'Estado', key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: 'Accion',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case true:
        return <img src={verify} alt="" />
      case false:
        return <CSpinner color="info" />

      default:
        return <CSpinner color="info" />
    }
  }

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
          <CNavbarBrand>Consulta de Afiliados y Familiares</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />

          <CCollapse className="navbar-collapse justify-content-end" visible={visible}>
            <CNavbarNav className="justify-content-end">
              <CNavItem>
                <CButton
                  color="dark"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleModalEditBeneficiary()}
                  active
                >
                  <CIcon size="lg" icon={cilUserPlus} />
                  Agregar Familiar
                </CButton>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>

      <CHeaderDivider></CHeaderDivider>
      {dataTotal.length}
      <CSmartTable
        activePage={1}
        cleaner
        clickableRows
        columns={columns}
        items={dataTotal}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          name: (item) => (
            <td>
              <CTooltip
                content={item.relationship ? ` Familiar de ${item.userId.name}` : 'Titular'}
                placement="top"
                trigger="hover"
              >
                <h5> {item.name.replace(/\b\w/g, (l) => l.toUpperCase())} </h5>
              </CTooltip>
            </td>
          ),
          idCard: (item) => (
            <td>
              <h6>
                {item.documentType.toUpperCase()}
                {'-'}
                {item.idCard}{' '}
              </h6>
            </td>
          ),
          status: (item) => (
            <td>
              <CTooltip
                content={
                  item.status
                    ? 'Verificado'
                    : 'En espera. Por favor, llevar documentos a la oficina principal del fondo mutual para su verificacion'
                }
                placement="top"
                trigger="hover"
              >
                <CBadge>{getBadge(item.status)}</CBadge>
              </CTooltip>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <CRow>
                  <CCol lg={2} xl={2}>
                    <CTooltip content="Detalles" placement="top" trigger="hover">
                      <CButton
                        color="info"
                        //variant="outline"
                        //shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(item._id)
                        }}
                      >
                        {details.includes(item._id) ? (
                          <CIcon icon={cilX} size="lg" />
                        ) : (
                          <CIcon icon={cilMenu} size="lg" />
                        )}
                      </CButton>
                    </CTooltip>
                  </CCol>
                  <CCol lg={2} xl={2}>
                    <CTooltip content="Solicitud" placement="top" trigger="hover">
                      <CButton
                        onClick={() => setVisibleModal(!visibleModal)}
                        color="dark"
                        //variant="outline"
                        //shape="square"
                        size="sm"
                        // onClick={() => {
                        //   toggleDetails(item._id)
                        // }}
                      >
                        {details.includes(item._id) ? (
                          <CIcon icon={cilX} size="lg" />
                        ) : (
                          <CIcon icon={cilMenu} size="lg" />
                        )}
                      </CButton>
                    </CTooltip>
                  </CCol>
                </CRow>
              </td>
            )
          },
          details: (item) => {
            return (
              <CRow>
                <CCollapse visible={details.includes(item._id)}>
                  <CCard>
                    <CCardBody>
                      <CCardTitle>
                        {item.name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                        {item.lastName.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                      </CCardTitle>
                      <CRow>
                        <CCol xs={12} md={4}>
                          <CCardText>
                            {item.documentType}
                            {item.idCard}
                          </CCardText>
                        </CCol>
                        <br />
                        <br />
                        <CCol xs={12} md={4} xxl={4}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              item?.relationship === 'hijo/a' && item?.sex === 'masculino'
                                ? hijo
                                : item?.relationship === 'hijo/a' && item?.sex === 'femenino'
                                ? hija
                                : item?.relationship === 'madre' && item?.sex === 'femenino'
                                ? madre
                                : item?.relationship === 'padre' && item?.sex === 'masculino'
                                ? padre
                                : item.relationship === 'conyuge' && item.sex === 'femenino'
                                ? conyugeF
                                : item.relationship === 'conyuge' && item.sex === 'femenino'
                                ? conyugeM
                                : hijo
                            }
                            width={150}
                            height={150}
                          />
                        </CCol>
                        <CCol xs={12} md={4} xxl={4}>
                          <CCardText className="text-muted">
                            Parentesco: {item?.relationship?.toUpperCase()}
                          </CCardText>
                          <CCardText className="text-muted">
                            Sexo: {item?.sex?.toUpperCase()}
                          </CCardText>
                          <CCardText className="text-muted">
                            Fecha Nacimiento: {item?.dateBirth}
                          </CCardText>
                          <CCardText className="text-muted">
                            Fecha Registro: {item?.registrationDate}
                          </CCardText>
                        </CCol>
                      </CRow>
                      <br />
                      {/* <CButton
                        onClick={() => handleModalEditBeneficiary(item)}
                        size="lg"
                        color="light"
                        shape="rounded-pill"
                      >
                        <CIcon icon={cilSettings} size="xxl" />
                      </CButton>
                      <CButton
                        onClick={() => deleteBeneficiary(item.idCard)}
                        size="lg"
                        color="light"
                        shape="rounded-pill"
                      >
                        <CIcon icon={cilTrash} size="xxl" />
                      </CButton> */}
                      {item.relationship ? (
                        <h5
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Es{' '}
                          {item.relationship.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                          del Titular:
                        </h5>
                      ) : (
                        <h5
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.beneficiaries.length === 0
                            ? 'No posee Carga Familiar'
                            : 'Carga Familiar'}
                        </h5>
                      )}

                      <CTable
                        hidden={
                          item.beneficiaries
                            ? item.beneficiaries.length === 0
                              ? true
                              : false
                            : false
                        }
                        hover
                      >
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Nº</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Cedula</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Parentesco</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {item.relationship ? (
                            <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>
                                {item.userId.documentType}
                                {item.userId.idCard}
                              </CTableDataCell>
                              <CTableDataCell>{item.userId.name}</CTableDataCell>
                              <CTableDataCell>{item.userId.dateBirth}</CTableDataCell>
                              <CTableDataCell>{item.userId.relationship}</CTableDataCell>
                            </CTableRow>
                          ) : (
                            item?.beneficiaries?.map((el, index) => (
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>
                                  {el.documentType}
                                  {el.idCard}
                                </CTableDataCell>
                                <CTableDataCell>{el.name}</CTableDataCell>
                                <CTableDataCell>{el.dateBirth}</CTableDataCell>
                                <CTableDataCell>{el.relationship}</CTableDataCell>
                              </CTableRow>
                            ))
                          )}
                        </CTableBody>
                      </CTable>
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

      <ModalEditBeneficiary
        setVisibleModalEdit={setVisibleModalEdit}
        visibleModalEdit={visibleModalEdit}
      />
      <Modal
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        //Component1={Component1}
        //Component2={Component2}
        //Component3={Component3}
      />
    </>
  )
}
