import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Fondo Mutual UNEFM
        </a> */}
        <span className="ms-1">Fondo Mutual UNEFM</span>
        <span className="ms-1">&copy; 1995 Todos Los Derechos Reservados.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          LHAO
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
