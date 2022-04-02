import padre from '../../assets/images/avatars/padre.svg'
import madre from '../../assets/images/avatars/madre.svg'
import conyugeF from '../../assets/images/avatars/conyugeF.svg'
import conyugeM from '../../assets/images/avatars/conyugeM.svg'
import fondoCard from '../../assets/images/image.jpg'

import * as moment from 'moment'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardImageOverlay,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/react-pro'

import React, { useState, useContext } from 'react'

import { Context } from '../../contexts/Context'
import axios from 'axios'
export default function Profile() {
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)
  const [visible, setVisible] = useState(false)
  const [updateData, setUpdateData] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const fecha = moment(currentUser?.registrationDate).format('DD MMM YYYY')

  const UpdateData = async (e) => {
    e.preventDefault()
    setShowSpinner(true)

    //alert('Completa todos los Campos')
    try {
      const { data } = await axios.patch(
        'http://localhost:3100/fmunefm/modify-headline',
        updateData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      if (data.status === 403) {
        alert('Este email ya existe')
        setShowSpinner(false)
      } else {
        dispatch({
          type: 'SET_USER_DATA',
          payload: updateData,
        })
        setShowSpinner(false)
        setVisible(false)
      }
    } catch (error) {
      if (error) {
        console.log(error)
      }
    }
  }

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
        <CCol style={{ marginLeft: 'auto', marginRight: 'auto' }} xs={12} md={10} lg={10} xl={10}>
          <CCard>
            <CCardImage style={{ height: '10rem' }} orientation="top" src={fondoCard} />
            <CCardImageOverlay
              style={{
                textAlignLast: 'center',
                textShadow: '0.3em 0.3em 0.2em rgba(19, 21, 22, 0.575)',
              }}
            >
              <CAvatar
                src={
                  edad < 50 && currentUser?.sex === 'MASCULINO'
                    ? conyugeM
                    : edad < 50 && currentUser?.sex === 'FEMENINO'
                    ? conyugeF
                    : edad > 50 && currentUser?.sex === 'MASCULINO'
                    ? padre
                    : edad > 50 && currentUser?.sex === 'FEMENINO'
                    ? madre
                    : '??'
                }
                size="xl"
              />
              <br />

              <CCardTitle style={{ color: '#fff' }}>
                <b>
                  {currentUser?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()) +
                    ' ' +
                    currentUser?.lastName?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </b>
              </CCardTitle>
              <CCardText style={{ color: '#fff' }}>
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
                    <b>Estado Civil:</b> {currentUser?.civilStatus}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Categoria:</b> {currentUser?.category}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>tipo de Personal:</b> {currentUser?.personalType}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Genero/Sexo:</b> {currentUser?.sex}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Correo:</b> {currentUser?.email}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol md={6} xl={6}>
                <CListGroup flush>
                  <CListGroupItem>
                    <b>Fecha de Nacimiento:</b> {currentUser?.dateBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Fecha de Registro:</b> {fecha}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Lugar de Nacimiento:</b> {currentUser?.placeBirth}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Numero de Telefono:</b> {currentUser?.phone}
                  </CListGroupItem>
                  <CListGroupItem>
                    <b>Direccion de Habitacion:</b> {currentUser?.direction}
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CButton onClick={() => setVisible(!visible)}>Actualizar Datos</CButton>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <div
            hidden={!showSpinner}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              backgroundColor: 'rgba(8, 34, 49, 0.575)',
            }}
          >
            <CSpinner style={{ display: 'block' }} color="info" />
            <span style={{ display: 'block', color: '#fff' }}>...Cargando</span>
          </div>
          <CModalHeader>
            <CModalTitle>Actualizar Datos</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3">
              <CCol md={4} lg={6}>
                <CFormLabel htmlFor="email">Correo</CFormLabel>
                <CFormInput
                  //value={updateData?.email}
                  type="text"
                  id="email"
                  defaultValue={currentUser?.email}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, email: e.target.value })
                  }}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="phone">Telefono</CFormLabel>
                <CFormInput
                  //value={updateData?.phone}
                  type="text"
                  id="phone"
                  defaultValue={currentUser?.phone}
                  onChange={(e) => {
                    setUpdateData({ ...updateData, phone: e.target.value })
                  }}
                />
              </CCol>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton onClick={UpdateData}>Sign in</CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      </div>
      {/* /////////////////////////////////////////////////////////// */}
    </>
  )
}
