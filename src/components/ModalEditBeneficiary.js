import React, { useState } from 'react'
import hijo from '../assets/images/avatars/hijo.png'
import hija from '../assets/images/avatars/hija.png'
import padre from '../assets/images/avatars/padre.png'
import madre from '../assets/images/avatars/madre.png'
import conyuge from '../assets/images/avatars/conyuge.png'
import { useContext } from 'react'
import { Context } from '../contexts/Context'
import axios from 'axios'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CCol,
  CButton,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CInputGroup,
  CFormFloating,
  CAvatar,
  CFormCheck,
  CFormSelect,
  CFormSwitch,
  CTooltip,
} from '@coreui/react-pro'
import { cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

export default function ModalEditBeneficiary({ setVisibleModalEdit, visibleModalEdit }) {
  ModalEditBeneficiary.propTypes = {
    setVisibleModalEdit: PropTypes.bool,
    visibleModalEdit: PropTypes.bool,
  }

  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context)
  //const dataUser = currentUser?.dataUser

  const [validated, setValidated] = useState(false)
  const [datosBeneficiary, setDatosBeneficiary] = useState(null)

  const handleEditModal = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(false)
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      try {
        setValidated(true)

        const { data } = await axios.post(
          'https://backend-fmunefm.herokuapp.com/beneficiary/register',
          datosBeneficiary,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        dispatch({
          type: 'SET_BENEFICIARY',
          payload: data,
        })
        console.log(data)
        setVisibleModalEdit(false)
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    }
  }
  return (
    <CModal
      alignment="center"
      visible={visibleModalEdit}
      onClose={() => {
        setDatosBeneficiary(null)
        document.getElementById('Form').reset()
        setVisibleModalEdit(false)
      }}
    >
      <CModalHeader>
        <CModalTitle>Agregar Familiar</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          id="Form"
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleEditModal}
        >
          <CCol xs={11} md={12} className="position-relative">
            <h6>Parentesco</h6>
          </CCol>
          <CCol xs={11} md={12} className="position-relative">
            <CTooltip content="Hijo" placement="top" trigger="focus">
              <CFormCheck
                onChange={(e) => {
                  setDatosBeneficiary({
                    ...datosBeneficiary,
                    relationship: e.target.value,
                    sex: 'masculino',
                  })
                }}
                button={{ color: 'info', variant: 'outline' }}
                label={<CAvatar src={hijo} size="xl" />}
                type="radio"
                name="relationship"
                id="hijo"
                required
                value="hijo"
              />
            </CTooltip>
            <CTooltip trigger="focus" content="Hija" placement="top">
              <CFormCheck
                onChange={(e) => {
                  setDatosBeneficiary({
                    ...datosBeneficiary,
                    relationship: e.target.value,
                    sex: 'femenino',
                  })
                }}
                button={{ color: 'info', variant: 'outline' }}
                label={<CAvatar src={hija} size="xl" />}
                type="radio"
                name="relationship"
                id="hija"
                required
                value="hija"
              />
            </CTooltip>
            <CTooltip content="Padre" placement="top" trigger="focus">
              <CFormCheck
                onChange={(e) => {
                  setDatosBeneficiary({
                    ...datosBeneficiary,
                    relationship: e.target.value,
                    sex: 'masculino',
                  })
                }}
                button={{ color: 'info', variant: 'outline' }}
                label={<CAvatar src={padre} size="xl" />}
                type="radio"
                name="relationship"
                id="padre"
                required
                value="padre"
              />
            </CTooltip>
            <CTooltip content="Madre" placement="top" trigger="focus">
              <CFormCheck
                onChange={(e) => {
                  setDatosBeneficiary({
                    ...datosBeneficiary,
                    relationship: e.target.value,
                    sex: 'femenino',
                  })
                }}
                button={{ color: 'info', variant: 'outline' }}
                label={<CAvatar src={madre} size="xl" />}
                type="radio"
                name="relationship"
                id="madre"
                required
                value="madre"
              />
            </CTooltip>
            <CTooltip content="Conyuge" placement="top" trigger="focus">
              <CFormCheck
                onChange={(e) => {
                  setDatosBeneficiary({
                    ...datosBeneficiary,
                    relationship: e.target.value,
                    sex: currentUser.sex === 'Masculino' ? 'femenino' : 'masculino',
                  })
                }}
                button={{ color: 'info', variant: 'outline' }}
                label={<CAvatar src={conyuge} size="xl" />}
                type="radio"
                name="relationship"
                id="conyuge"
                required
                value="conyuge"
              />
            </CTooltip>

            <CFormFeedback tooltip invalid>
              Por favor selecciona un Parentesco?
            </CFormFeedback>
          </CCol>
          <CCol xs={12} md={12} className="position-relative">
            <CFormSwitch label="Hijo con Cedula" id="" />
          </CCol>
          <CCol xs={12} md={6} className="position-relative">
            <CInputGroup className="has-validation">
              {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
              <CCol xs={3} md={5} xl={5}>
                <CFormFloating className="mb-3">
                  <CFormSelect
                    value={datosBeneficiary?.documentType}
                    onChange={(e) => {
                      setDatosBeneficiary({ ...datosBeneficiary, documentType: e.target.value })
                    }}
                    required
                  >
                    <option></option>
                    <option value="V">V</option>
                    <option value="E">E</option>
                  </CFormSelect>
                  <CFormLabel htmlFor="Tipo">Tipo</CFormLabel>
                  <CFormFeedback tooltip invalid>
                    Tipo nacionalidad?
                  </CFormFeedback>
                </CFormFloating>
              </CCol>

              <CCol xs={9} md={7} xl={7}>
                <CFormFloating className="mb-3">
                  <CFormInput
                    value={datosBeneficiary?.idCard}
                    onChange={(e) => {
                      setDatosBeneficiary({ ...datosBeneficiary, idCard: e.target.value })
                    }}
                    type="text"
                    id="Cedula"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <CFormLabel htmlFor="Cedula">Cedula</CFormLabel>
                  <CFormFeedback tooltip invalid>
                    Cedula?
                  </CFormFeedback>
                </CFormFloating>
              </CCol>
            </CInputGroup>
          </CCol>
          <CCol xs={6} md={6} className="position-relative">
            <CFormFloating className="mb-3">
              <CFormInput
                onChange={(e) => {
                  setDatosBeneficiary({ ...datosBeneficiary, name: e.target.value })
                }}
                value={datosBeneficiary?.name}
                type="text"
                id="Nombre"
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormLabel htmlFor="Nombre">Nombre</CFormLabel>
              <CFormFeedback tooltip invalid>
                Nombre?
              </CFormFeedback>
            </CFormFloating>
          </CCol>
          <CCol xs={6} md={6} className="position-relative">
            <CFormFloating className="mb-3">
              <CFormInput
                onChange={(e) => {
                  setDatosBeneficiary({ ...datosBeneficiary, lastName: e.target.value })
                }}
                value={datosBeneficiary?.lastName}
                type="text"
                id="Apellido"
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormLabel htmlFor="Apellido">Apellido</CFormLabel>
              <CFormFeedback tooltip invalid>
                Apellido?
              </CFormFeedback>
            </CFormFloating>
          </CCol>

          <CCol md={6} className="position-relative">
            <CFormFloating className="mb-3">
              <CFormInput
                locale="es-VE"
                onChange={(e) => {
                  setDatosBeneficiary({ ...datosBeneficiary, dateBirth: e.target.value })
                }}
                value={datosBeneficiary?.dateBirth}
                type="date"
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormLabel htmlFor="Nombre">Fecha de Nacimiento</CFormLabel>
              <CFormFeedback tooltip invalid>
                Fecha de nacimiento?
              </CFormFeedback>
            </CFormFloating>
          </CCol>
          {/* <CCol md={3} className="position-relative">
            <CFormLabel htmlFor="validationTooltip04">City</CFormLabel>
            <CFormSelect id="validationTooltip04" required>
              <option disabled value="">
                Choose...
              </option>
              <option>...</option>
            </CFormSelect>
            <CFormFeedback tooltip invalid>
              Please provide a valid city.
            </CFormFeedback>
          </CCol>
          <CCol md={3} className="position-relative">
            <CFormLabel htmlFor="validationTooltip05">City</CFormLabel>
            <CFormInput type="text" id="validationTooltip05" required />
            <CFormFeedback tooltip invalid>
              Please provide a valid zip.
            </CFormFeedback>
          </CCol> */}
          <CCol xs={12} className="position-relative">
            <CButton
              //onClick={() => setVisibleModalEdit(false)}
              type="submit"
              size="lg"
              color="info"
              shape="rounded-pill"
            >
              <CIcon icon={cilSend} size="xl" />
              <span>Enviar</span>
            </CButton>
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  )
}
