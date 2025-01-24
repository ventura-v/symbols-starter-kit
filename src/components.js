'use strict'

import { Flex, Link, Grid } from 'smbls'

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center space-between'
  },

  Flex: {
    props: { gap: 'C' },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration: window.location.pathname === props.href ? 'underline' : 'none'
      })
    },
    Text_logo: { href: '/', text: 'Hello!' },
    Text_about: { href: '/about', text: 'About' }
  },

  ThemeSwitcher: {}
}

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: 'A2' },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: 'pointer',
      '.active': {
        fontWeight: '900'
      }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key })
      }
    }
  },
  dark: { text: 'Dark' },
  light: { text: 'Light' },
  midnight: { text: 'Midnight' }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}

const GridAtom = {
  props: {
    width: '26px',
    height: '26px',
    background: '#E8F1FF',
    ":hover": {
      background: '#3D7BD9',
      cursor: 'pointer',
    },
  },
  state: { value: 0 },
  on: {
    click: (event, element, state) => {
      state.update({ value: state.value + 1 })
      console.log(state.value)
    },
    mouseover: (event, element, state) => {
      console.log(element.key)
    }
  }
}

export const GridContainer = {
  extend: Grid,
  props: {
    templateColumns: 'repeat(16, 1fr)',
    templateRows: 'repeat(8, 1fr)',
    columnGap: 'A1',
    rowGap: 'A1',
    state: { length: 0 },
  },
  on: {
    click: (event, element, state) => {
      state.update({ length: 16 * 8 })
      console.log(state.length)
    },
    mouseover: (event, element, state) => {
      console.log(element)
    },
  }
}

export const GridSelection = {
  extend: GridContainer,
  props: {
    templateColumns: 'repeat(16, 1fr)',
    templateRows: 'repeat(8, 1fr)',
    columnGap: 'A1',
    rowGap: 'A1',
    state: { length: 0 },
  },
  on: {
    mouseover: (event, element, state) => {
      console.log(element)
    },  
  },  
  childExtend: GridAtom,
  ...Array.from({ length: 16 * 8 }, () => GridAtom)
}