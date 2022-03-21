import React from 'react'
import { CRow, CCard, CCardBody } from '@coreui/react'

import TableBeneficiaries from 'src/components/TableBeneficiaries'

// import { CButton } from '@coreui/react-pro'

const Beneficiaries = () => {
  return (
    <>
      <CCard className="mb-4" style={{ width: '100%' }}>
        <CCardBody>
          <CRow>{<TableBeneficiaries />}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Beneficiaries
