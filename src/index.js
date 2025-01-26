'use strict'

import { create, Flex } from 'smbls'

import designSystem from './designSystem'
import * as components from './components'
import pages from './pages'

const x = 8
const y = 16

create({
  extend: Flex,

  props: {
    theme: 'document',
    flow: 'column',
    height: '100vh',
    align: 'center space-between'
  },

  Header: {},

  GridContainer: {tableX: x, tableY: y},

}, {
  designSystem,
  components,
  pages
})