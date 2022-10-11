import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logoFM from 'src/assets/images/logoFMW.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

/// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebar = useSelector((state) => state.sidebar)
  return (
    <CSidebar
      position="fixed"
      unfoldable={sidebar.unfoldable}
      visible={sidebar.show}
      onVisibleChange={(visible) => {
        dispatch({ type: 'SIDEBAR_SHOW', payload: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage
          className="sidebar-brand-full"
          src={logoFM}
          width={250}
          style={{ padding: '10px' }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'SIDEBAR_UNFOLDABLE'})}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
