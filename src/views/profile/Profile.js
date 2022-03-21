import padre from '../../assets/images/avatars/padre.svg'
import madre from '../../assets/images/avatars/madre.svg'
import conyugeF from '../../assets/images/avatars/conyugeF.svg'
import conyugeM from '../../assets/images/avatars/conyugeM.svg'
import fondoCard from '../../assets/images/image.jpg'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardImageOverlay,
  CCardLink,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react-pro'

import React from 'react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
export default function Profile() {
  const {
    state: { currentUser },
  } = useContext(Context)

  const calcularEdad = () => {
    var hoy = new Date()
    var cumpleanos = new Date(currentUser?.dateBirth)
    var edad = hoy.getFullYear() - cumpleanos.getFullYear()
    var m = hoy.getMonth() - cumpleanos.getMonth()

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--
    }

    return edad
  }
  const edad = calcularEdad()
  return (
    <>
      <CRow>
        <CCol style={{ marginLeft: 'auto', marginRight: 'auto' }} xs={12} md={10} lg={9} xl={8}>
          <CCard>
            <CCardImage style={{ height: '10rem' }} orientation="top" src={fondoCard} />
            <CCardImageOverlay
              style={{ textAlignLast: 'center', textShadow: '0.2em 0.2em 0.2em #fff' }}
            >
              <CAvatar
                src={
                  edad < 50 && currentUser?.sex === 'masculino'
                    ? conyugeM
                    : edad < 50 && currentUser?.sex === 'femenino'
                    ? conyugeF
                    : edad > 50 && currentUser?.sex === 'masculino'
                    ? padre
                    : edad > 50 && currentUser?.sex === 'femenino'
                    ? madre
                    : '??'
                }
                size="xl"
              />
              <br />
              <br />
              <CCardTitle>
                {currentUser?.name?.replace(/\b\w/g, (l) => l.toUpperCase()) +
                  ' ' +
                  currentUser?.lastName?.replace(/\b\w/g, (l) => l.toUpperCase())}
              </CCardTitle>
              <CCardText>
                {currentUser?.documentType?.toUpperCase() + ' ' + currentUser?.idCard}
              </CCardText>
            </CCardImageOverlay>
            <CCardBody style={{ textAlignLast: 'center' }}>
              <CCardTitle>Informacion de tu Perfil</CCardTitle>
              <h6 style={{ fontSize: '10px', border: ' 1px solid #000', width: '55px' }}>
                BIOGRAFIA
              </h6>
            </CCardBody>
            <CRow>
              <CCol md={6} xl={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <b>Fecha de Nacimiento:</b> {currentUser?.dateBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Fecha de Registro:</b> {currentUser?.registrationDate}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Lugar de Nacimiento:</b> {currentUser?.placeBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Direccion de Habitacion:</b> {currentUser?.direction}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Numero de Telefono:</b> {currentUser?.phone}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6} xl={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <b>Fecha de Nacimiento:</b> {currentUser?.dateBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Lugar de Nacimiento:</b> {currentUser?.placeBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Direccion de Habitacion:</b> {currentUser?.direction}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Numero de Telefono:</b> {currentUser?.phone}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
            {/* <CCardBody>
            <CCardLink href="#">Card link</CCardLink>
            <CCardLink href="#">Another link</CCardLink>
          </CCardBody> */}
          </CCard>
        </CCol>
      </CRow>
      {/*/////////////////////////////////////////////////////////////////// */}
      <CForm className="row g-3">
        <CCol md={4} lg={6}>
          <CFormLabel htmlFor="idCard">Cedula</CFormLabel>
          <CFormInput
            disabled
            type="text"
            id="idCard"
            defaultValue={currentUser?.documentType + ' ' + currentUser?.idCard}
          />
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="nameAndLastName">Nombre y Apellido</CFormLabel>
          <CFormInput
            disabled
            type="text"
            id="nameAndLastName"
            defaultValue={
              currentUser?.name.replace(/\b\w/g, (l) => l.toUpperCase()) +
              ' ' +
              currentUser?.lastName.replace(/\b\w/g, (l) => l.toUpperCase())
            }
          />
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
          <CFormInput type="password" id="inputPassword4" />
        </CCol>
        <CCol xs={12}>
          <CFormLabel htmlFor="inputAddress">Edad</CFormLabel>
          <CFormInput defaultValue={calcularEdad()} id="inputAddress" placeholder="" />
        </CCol>
        <CCol xs={12}>
          <CFormLabel htmlFor="inputAddress2">Address 2</CFormLabel>
          <CFormInput id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </CCol>
        <CCol md={6}>
          <CFormLabel htmlFor="inputCity">City</CFormLabel>
          <CFormInput id="inputCity" />
        </CCol>
        <CCol md={4}>
          <CFormLabel htmlFor="inputState">State</CFormLabel>
          <CFormSelect id="inputState">
            <option>Choose...</option>
            <option>...</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
          <CFormInput id="inputZip" />
        </CCol>
        <CCol xs={12}>
          <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Sign in</CButton>
        </CCol>
      </CForm>
    </>
  )
}
