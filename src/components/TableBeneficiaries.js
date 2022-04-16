import React, { useState } from 'react'
import verify from '../assets/icons/usuarioVerificado.png'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import hijo from '../assets/images/avatars/hijo.svg'
import hija from '../assets/images/avatars/hija.svg'
import padre from '../assets/images/avatars/padre.svg'
import madre from '../assets/images/avatars/madre.svg'
import conyugeF from '../assets/images/avatars/conyugeF.svg'
import conyugeM from '../assets/images/avatars/conyugeM.svg'
import { CButton, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilTrash, cilUserPlus } from '@coreui/icons'
import ModalBeneficiary from './ModalBeneficiary'
import {
  CAvatar,
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
  CTooltip,
} from '@coreui/react-pro'
import axios from 'axios'
import { IconButton } from '@mui/material'
import { DisplaySettings, PersonalVideo } from '@mui/icons-material'

export default function TableBeneficiaries() {
  const {
    state: { dataTotal, currentUser },
  } = useContext(Context)
  const Beneficiaries = currentUser?.beneficiaries
  const [visibleModalEdit, setVisibleModalEdit] = useState(false)
  const [details, setDetails] = useState([])
  const [visible, setVisible] = useState(false)

  console.log(Beneficiaries)
  const handleModalEditBeneficiary = () => {
    setVisibleModalEdit(!visibleModalEdit)
  }

  console.log(dataTotal)
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
      label: 'Opciones',
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
          <CNavbarBrand>Carga Familiar</CNavbarBrand>
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
      <CSmartTable
        activePage={1}
        cleaner
        clickableRows
        columns={columns}
        items={Beneficiaries}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          name: (item) => (
            <td>
              <CTooltip
                content={item.relationship.replace(/\b\w/g, (l) => l.toUpperCase())}
                placement="top"
                trigger="hover"
              >
                <h5>
                  <CAvatar
                    size="xl"
                    src={
                      item?.relationship === 'PADRE'
                        ? padre
                        : item?.relationship === 'MADRE'
                        ? madre
                        : item?.relationship === 'HIJA'
                        ? hija
                        : item?.relationship === 'HIJO'
                        ? hijo
                        : item?.relationship === 'CONYUGE' && item?.beneficiary?.sex === 'FEMENINO'
                        ? conyugeF
                        : item?.relationship === 'CONYUGE' && item?.beneficiary?.sex === 'MASCULINO'
                        ? conyugeM
                        : ''
                    }
                  />{' '}
                  {item?.beneficiary?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                </h5>
              </CTooltip>
            </td>
          ),
          idCard: (item) => (
            <td>
              <h6>
                {item?.beneficiary?.documentType.toUpperCase()}
                {'-'}
                {item?.beneficiary?.idCard}{' '}
              </h6>
            </td>
          ),
          status: (item) => (
            <td>
              <CTooltip
                content={item?.beneficiary?.status ? 'Verificado' : 'En espera'}
                placement="top"
                trigger="hover"
              >
                <CBadge>{getBadge(item?.beneficiary?.status)}</CBadge>
              </CTooltip>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <IconButton
                  color="info"
                  //variant="outline"
                  //shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item?.beneficiary?.idCard)
                  }}
                >
                  {details.includes(item?.beneficiary?.idCard) ? (
                    <PersonalVideo />
                  ) : (
                    <DisplaySettings />
                  )}
                </IconButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CRow>
                <CCollapse visible={details.includes(item?.beneficiary?.idCard)}>
                  <CCard>
                    {/* <CCardHeader component="h5">Header</CCardHeader> */}
                    <CCardBody>
                      <CCardTitle>
                        {item?.beneficiary?.name
                          ?.toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                        {item?.beneficiary?.lastName
                          ?.toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </CCardTitle>
                      <CRow>
                        <CCol xs={12} md={4}>
                          <CCardText>
                            {item?.beneficiary?.documentType}
                            {item?.beneficiary?.idCard}
                          </CCardText>
                        </CCol>
                        <br />
                        <br />
                        <CCol xs={12} md={4} xxl={4}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              item?.relationship === 'HIJO' &&
                              item?.beneficiary?.sex === 'MASCULINO'
                                ? hijo
                                : item?.relationship === 'HIJO' &&
                                  item?.beneficiary?.sex === 'FEMENINO'
                                ? hija
                                : item?.relationship === 'MADRE' &&
                                  item?.beneficiary?.sex === 'FEMENINO'
                                ? madre
                                : item?.relationship === 'PADRE' &&
                                  item?.beneficiary?.sex === 'MASCULINO'
                                ? padre
                                : item?.relationship === 'CONYUGE' &&
                                  item?.beneficiary?.sex === 'FEMENINO'
                                ? conyugeF
                                : item?.relationship === 'CONYUGE' &&
                                  item?.beneficiary?.sex === 'MASCULINO'
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
                            Sexo: {item?.beneficiary?.sex?.toUpperCase()}
                          </CCardText>
                          <CCardText className="text-muted">
                            Fecha Nacimiento: {item?.beneficiary?.dateBirth}
                          </CCardText>
                          <CCardText className="text-muted">
                            Fecha Registro: {item?.beneficiary?.registrationDate}
                          </CCardText>
                        </CCol>
                      </CRow>
                      <br />
                      <CButton
                        onClick={() => handleModalEditBeneficiary(item)}
                        size="lg"
                        color="light"
                        shape="rounded-pill"
                      >
                        <CIcon icon={cilSettings} size="xxl" />
                      </CButton>
                      <CButton
                        onClick={() => deleteBeneficiary(item?.beneficiary?.idCard)}
                        size="lg"
                        color="light"
                        shape="rounded-pill"
                      >
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

      <ModalBeneficiary
        setVisibleModalEdit={setVisibleModalEdit}
        visibleModalEdit={visibleModalEdit}
      />
    </>
  )
}
