import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilMenu } from '@coreui/icons'

import { useContext } from 'react'
import { Context } from '../contexts/Context'
import { AppHeaderDropdown } from './header/index'
import logoFM from 'src/assets/images/logoFMB.png'

const AppHeader = () => {
  const {
    state: { currentUser },
  } = useContext(Context)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage src={logoFM} width={200} />
        </CHeaderBrand>
        <CHeaderDivider />
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Inicio
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/notifications/modals" component={NavLink}>
              Citas Con Especialistas
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/notifications/badges" component={NavLink}>
              Settings
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <h4> {currentUser?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}</h4>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
