
import React, { useReducer, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  currentUser: null,
  dataTotal: null,
  consultations: [],
  generalConsultations: [],
  services: [],
  packages: [],
  exchangeRate: [],
  titulares: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, currentUser: { ...state.currentUser, ...action.payload } }
    case 'SET_DATA_TOTAL':
      return { ...state, dataTotal: action.payload }
    case 'SET_BENEFICIARY':
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          beneficiaries: [...state.currentUser.beneficiaries, action.payload],
        },
      }
    case 'SET_ SERVICE':
      return {
        ...state,
        services: [...state.services, ...action.payload],
      }
    case 'SET_ SERVICES':
      return {
        ...state,
        services: [...action.payload],
      }
    case 'SET_ PACKAGE':
      return {
        ...state,
        packages: [...state.packages, ...action.payload],
      }
    case 'SET_ PACKAGES':
      return {
        ...state,
        packages: [...action.payload],
      }
    case 'SET_ EXCHANGE-RATE':
      return {
        ...state,
        exchangeRate: [...action.payload],
      }
    case 'SET_CONSULTATIONS':
      return {
        ...state,
        consultations: action.payload,
      }
    case 'SET_GENERAL_CONSULTATIONS':
      return {
        ...state,
        generalConsultations: action.payload,
      }
    case 'SET_TITULARES':
      return {
        ...state,
        titulares: [...action.payload],
      }
    case 'RESET':
      return { ...state, currentUser: null, dataTotal: [] }
    default:
      return state
  }
}

const Context = createContext(initialState)
const ContextProvider = ({ children }) => {
  ContextProvider.propTypes = {
    children: PropTypes.node,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentUser } = state
  /* const logout = () => {
    history.push('/')
  } */

  useEffect(() => { }, [dispatch, currentUser])

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export { Context, ContextProvider }
