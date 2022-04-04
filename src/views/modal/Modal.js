import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import React from 'react'
import PropTypes from 'prop-types'
import StepperHorizontal from '../stepper/Stepper'
export default function Modal({
  visibleModal,
  setVisibleModal,
  Component1,
  Component2,
  Component3,
}) {
  Modal.propTypes = {
    visibleModal: PropTypes.bool,
    setVisibleModal: PropTypes.func,
    Component1: PropTypes.bool,
    Component2: PropTypes.bool,
    Component3: PropTypes.bool,
  }
  //const [visibleXXL, setVisibleXXL] = useState(false)

  return (
    <>
      <CModal fullscreen="xxl" visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <CModalHeader>
          <CModalTitle>Full screen below xxl</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <StepperHorizontal
            Component1={Component1}
            Component2={Component2}
            Component3={Component3}
          />
        </CModalBody>
      </CModal>
    </>
  )
}
