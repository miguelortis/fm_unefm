import React, { useState } from 'react'
import { createContext } from 'react'
import { useHistory } from 'react-router-dom'
//import roles from '../helpers/roles'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  AuthProvider.propTypes = {
    children: PropTypes.node,
  }
  //const [user, setUser] = useState(null)
  const history = useHistory()
  const [user, setUser] = useState(null)

  setUser({ role: 'admin' })
  const login = (userCredentials, fromLocation) => {
    setUser({ id: 1, name: 'Luis', email: 'luis@gmail.com' })
    if (fromLocation) {
      history.push(fromLocation)
    }
  }
  console.log(user)

  //const logout = () => setUser(null)

  // const updateUser = (data) => {
  //   setUser({
  //     ...user,
  //     ...data,
  //   })
  // }

  // const isLogged = () => !!user
  // const hasRole = (role) => user?.role === role

  const contextValue = {
    user,

    //   updateUser,
    //   isLogged,
    //   hasRole,
    login,
    //logout,
  }
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
