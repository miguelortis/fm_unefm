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
import { Badge } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 70,
    top: 40,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

const AppHeader = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  console.log(currentUser)
  ///
  return (
    <CHeader position="fixed" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CImage src={logoFM} width={200} />
        </CHeaderBrand>
        <CHeaderDivider />
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'SIDEBAR_SHOW'})}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/account" component={NavLink} activeClassName="active">
              Inicio
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
          <StyledBadge color="primary" badgeContent={currentUser?.role?.name?.toUpperCase()}>
            <h4> {currentUser?.user?.name?.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}</h4>
          </StyledBadge>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
