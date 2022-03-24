import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { CSpinner } from '@coreui/react-pro'

const Login = () => {
  const history = useHistory()
  const [spinner, setSpinner] = useState(true)
  if (!!localStorage.getItem('token')) {
    return <Redirect to="/account" />
  }

  async function handleLogin(e) {
    setSpinner(false)
    e.preventDefault()
    const idCard = document.getElementById('idCard').value
    const password = document.getElementById('password').value
    try {
      const result = await fetch('https://backend-fmunefm.herokuapp.com/fmunefm/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCard,
          password,
        }),
      }).then((res) => res.json())
      console.log(result)
      if (result.status === 202) {
        localStorage.setItem('token', result.data)
        history.push('/account')
        setSpinner(true)
      } else if (result.status === 204) {
        alert('usuario no existe')
        setSpinner(true)
      } else if (result.status === 400) {
        alert('Contraseña incorrecta')
        setSpinner(true)
      } else if (result.status === 401) {
        alert('Este usuario se encuentra en espera para ser verificado')
        setSpinner(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div
        hidden={spinner}
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
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm id="login">
                    <h1>Iniciar Sesion</h1>
                    <p className="text-medium-emphasis">Ingresa los datos de tu Cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        id="idCard"
                        placeholder="Cedula"
                        required
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="password"
                        required
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={handleLogin}
                          color="primary"
                          type="submit"
                          className="px-4"
                        >
                          Iniciar Sesion
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Se te Olvido tu Contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Registrarse</h2>
                    <p>
                      Solo para Trabajadores de la Universidad Nacional Experimental Francisco de
                      Miranda.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Registrate Ahora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
