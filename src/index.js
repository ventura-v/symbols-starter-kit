'use strict'

import { create, Flex } from 'smbls'

import designSystem from './designSystem'
import * as components from './components'
// import * as components from './components copy 2'
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

  // GridSelection: { x, y },
  GridContainer: {tableX: x, tableY: y},

  // IconsList: {}
  // Footer: {  }
}, {
  designSystem,
  components,
  pages
})

/*
background: state.selectedCells.includes(element.key) 
      ? '#FF5733' 
      : '#E8F1FF',
  })
*/