import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPeople, cilClock } from '@coreui/icons'
import { Link } from 'react-router-dom'

import axios from 'axios'

const Register = () => {
  const [newUser, setNewUser] = useState({})
  const [passwordConfirm, setPasswordConfirm] = useState(null)

  const handleOk = () => {
    if (
      newUser.name == null ||
      newUser.dateBirth == null ||
      newUser.category == null ||
      newUser.civilStatus == null ||
      newUser.direction == null ||
      newUser.documentType == null ||
      newUser.email == null ||
      newUser.idCard == null ||
      newUser.lastName == null ||
      newUser.sex == null ||
      newUser.password == null ||
      newUser.personalType == null ||
      newUser.phone == null ||
      newUser.placeBirth == null
    ) {
      alert('Completa todos los campos por favor')
    } else {
      if (!passwordConfirm) {
        alert('la contraseña de confirmacion no coincide')
      } else {
        /*         let usuario = { user: newUser }
        console.log(usuario) */
        console.log(newUser)

        axios
          .post('http://localhost:3100/fmunefm/register', newUser)
          .then((res) => {
            console.log(res)
            // if (res.status === 200 || res.status === 201) {
            //   form.resetFields()
            //   setAfiliados([])
            //   success()
            //   setInputDisablet(null)
          })
          .catch((err) => {
            if (err) {
              console.log(err)
            }
          })
      }
    }
    //  if (edadMin === true && datos.edad > 25) {
    //    alert('No puedes agregar hijos mayores de 25 años')
    //  } else {
    // setAfiliados([...afiliados, disabledCedula ? { ...datos, cedula: hijosincedula } : datos])
    //       // console.log(hijosincedula);
    //       setIsModalVisible(false)
    //       setDatos(0)
    //       setDisabledInput(true)
    //     }
    //   }
  }

  const handleCancel = () => {
    setNewUser({})
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={10} xl={10}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={(e) => e.preventDefault()} className="row g-3">
                  <h1>Registrate</h1>
                  <p className="text-medium-emphasis">Crea tu cuenta</p>
                  {/* *****************CEDULA**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CCol md={3} xl={2}>
                        <CFormSelect
                          required
                          onChange={(e) => {
                            setNewUser({ ...newUser, documentType: e.target.value })
                            console.log(e.target.value)
                          }}
                          name="documentType"
                          aria-label="Default select example"
                        >
                          <option></option>
                          <option value="V">V</option>
                          <option value="E">E</option>
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormInput
                          required
                          value={newUser.idCard}
                          onChange={(e) => {
                            setNewUser({ ...newUser, idCard: e.target.value })
                          }}
                          name="idCard"
                          type="number"
                          placeholder="Cedula"
                        />
                      </CCol>
                    </CInputGroup>
                  </CCol>
                  {/* *****************CONTRASEÑA**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.password}
                        onChange={(e) => {
                          setNewUser({ ...newUser, password: e.target.value })
                        }}
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        onChange={(e) => {
                          e.target.value === newUser.password
                            ? setPasswordConfirm(true)
                            : setPasswordConfirm(false)
                        }}
                        type="password"
                        placeholder="Confirmar Contraseña"
                        autoComplete="new-password"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************NOMBRE**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPeople} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.name}
                        onChange={(e) => {
                          setNewUser({ ...newUser, name: e.target.value })
                        }}
                        name="name"
                        placeholder="Nombres"
                        autoComplete="Nombres"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************APELLIDO**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPeople} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.lastName}
                        onChange={(e) => {
                          setNewUser({ ...newUser, lastName: e.target.value })
                        }}
                        name="lastName"
                        placeholder="Apellidos"
                        autoComplete="Apellidos"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************CORREO**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.email}
                        onChange={(e) => {
                          setNewUser({ ...newUser, email: e.target.value })
                        }}
                        name="email"
                        placeholder="Correo electronico"
                        autoComplete="email"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************FECHA NACIMIENTO**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilClock} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.dateBirth}
                        onChange={(e) => {
                          setNewUser({ ...newUser, dateBirth: e.target.value })
                        }}
                        name="dateBirth"
                        placeholder="Fecha de Nacimiento"
                        type="date"
                      />
                    </CInputGroup>
                  </CCol>

                  {/* *****************LUGAR NACIMIENTO**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilClock} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.placeBirth}
                        onChange={(e) => {
                          setNewUser({ ...newUser, placeBirth: e.target.value })
                        }}
                        name="placeBirth"
                        placeholder="Lugar de Nacimiento"
                        autoComplete="Lugar de Nacimiento"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************DIRECCION**************** */}
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPeople} />
                      </CInputGroupText>
                      <CFormTextarea
                        required
                        value={newUser.direction}
                        onChange={(e) => {
                          setNewUser({ ...newUser, direction: e.target.value })
                        }}
                        name="direction"
                        rows=" 1 "
                        placeholder="Direccion de Habitacion"
                        autoComplete="Direccion"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************TELEFONO**************** */}

                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilClock} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        value={newUser.phone}
                        onChange={(e) => {
                          setNewUser({ ...newUser, phone: e.target.value })
                        }}
                        name="phone"
                        type="number"
                        placeholder="Telefono"
                        autoComplete="Telefono"
                      />
                    </CInputGroup>
                  </CCol>
                  {/* *****************SEXO**************** */}
                  <CCol md={3} xs={6}>
                    <CFormFloating>
                      <CFormSelect
                        required
                        value={newUser.sex}
                        onChange={(e) => {
                          setNewUser({ ...newUser, sex: e.target.value })
                        }}
                        name="sex"
                        id="Sexo"
                      >
                        <option></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </CFormSelect>
                      <CFormLabel htmlFor="Sexo">Sexo</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  {/* *****************ESTADO CIVIL**************** */}
                  <CCol md={3} xs={6}>
                    <CFormFloating>
                      <CFormSelect
                        required
                        value={newUser.civilStatus}
                        onChange={(e) => {
                          setNewUser({ ...newUser, civilStatus: e.target.value })
                        }}
                        name="civilStatus"
                        id="Edocivil"
                      >
                        <option></option>
                        <option value="Soltero/a">Soltero/a</option>
                        <option value="Casado/a">Casado/a</option>
                        <option value="Divorciado/a">Divorciado/a</option>
                        <option value="Viudo/a">Viudo/a</option>
                        <option value="Otro">Otro</option>
                      </CFormSelect>
                      <CFormLabel htmlFor="Edocivil">Edo. Civil</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  <br />
                  {/* *****************CATEGORIA**************** */}
                  <CCol md={3} xs={6}>
                    <CFormFloating>
                      <CFormSelect
                        required
                        value={newUser.category}
                        onChange={(e) => {
                          setNewUser({ ...newUser, category: e.target.value })
                        }}
                        name="category"
                        id="Categoria"
                      >
                        <option></option>
                        <option value="Docente">Docente</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Obrero">Obrero</option>
                      </CFormSelect>
                      <CFormLabel htmlFor="Categoria">Categoria</CFormLabel>
                    </CFormFloating>
                  </CCol>
                  {/* *****************TIPO PERSONAL**************** */}
                  <CCol md={3} xs={6}>
                    <CFormFloating>
                      <CFormSelect
                        required
                        value={newUser.personalType}
                        onChange={(e) => {
                          setNewUser({ ...newUser, personalType: e.target.value })
                        }}
                        name="personalType"
                        id="tipoPersonal"
                      >
                        <option></option>
                        <option value="Fijo">Fijo</option>
                        <option value="Contratado">Contratado</option>
                        <option value="Jubilado">Jubilado</option>
                      </CFormSelect>
                      <CFormLabel htmlFor="tipoPersonal">Estatus</CFormLabel>.
                    </CFormFloating>
                  </CCol>
                  <br />
                  {/* *****************BOTONES**************** */}
                  <CCol md={6} xs={6}>
                    <CButton onClick={handleOk} color="success" type="submit">
                      Crear Registro
                    </CButton>
                  </CCol>
                  <CCol md={6} xs={6}>
                    <Link to="/login">
                      <CButton onClick={handleCancel} color="primary" tabIndex={-1}>
                        Iniciar Sesion
                      </CButton>
                    </Link>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
            <br />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
