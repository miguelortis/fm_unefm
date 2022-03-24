import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import Account from './views/account/Account.js'

it('mounts App without crashing', () => {
  const wrapper = shallow(<App />)
  wrapper.unmount()
})

it('mounts Account without crashing', () => {
  const wrapper = shallow(<Account />)
  wrapper.unmount()
})
