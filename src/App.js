import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import AuthProvider from './auth/AuthProvider'
import PrivateRoute from './components/PrivateRouter'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ContextProvider } from './contexts/Context'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/Unauthorised/Unauthorised'))

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Router>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path="/unauthorised"
                  name="Not Authorised"
                  render={(props) => <Page500 {...props} />}
                />
                <PrivateRoute
                  path="/"
                  name="Account"
                  render={(props) => <DefaultLayout {...props} />}
                />
                <Route exact path="*" name="Page 404" render={(props) => <Page404 {...props} />} />
                {/* <PrivateRoute
                path="/account/admin"
                name="Admin"
                render={(props) => <DefaultLayout {...props} />}
              /> */}
              </Switch>
            </React.Suspense>
          </Router>
        </LocalizationProvider>
      </ContextProvider>
    )
  }
}

export default App
