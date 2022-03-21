import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cilGroup } from '@coreui/icons'
import { useContext } from 'react'
import { Context } from '../../contexts/Context'

const WidgetsBrand = ({ withCharts }) => {
  const {
    state: { currentUser },
  } = useContext(Context)

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          icon={<CIcon icon={cibFacebook} height={52} className="my-4 text-white" />}
          values={[
            { title: 'friends', value: '89K' },
            { title: 'feeds', value: '459' },
          ]}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>

      <CCol sm={6} lg={3}>
        <CWidgetStatsD
          className="mb-4"
          color="info"
          icon={<CIcon icon={cilGroup} height={52} className="my-4 text-white" />}
          values={[{ title: 'Familiares', value: currentUser?.beneficiaries?.length }]}
        />
      </CCol>
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
