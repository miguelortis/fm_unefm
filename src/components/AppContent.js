import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense
        fallback={
          <div
            style={{
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
        }
      >
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/account" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
