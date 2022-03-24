import React from 'react'
import { CRow, CCard, CCardBody } from '@coreui/react'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'
import TableBeneficiaries from 'src/components/TableBeneficiaries'
import { Redirect } from 'react-router-dom'

// import { CButton } from '@coreui/react-pro'

const Beneficiaries = () => {
  const {
    state: { currentUser },
  } = useContext(Context)
  // if (currentUser.role !== 'fAmDuMnIeNfm') {
  //   return <Redirect to="/unauthorised" />
  // }
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
