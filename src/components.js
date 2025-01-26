'use strict'

import { Flex, Link, Grid, Text } from 'smbls'

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center',
    color: '#000',
  },

  Flex: {
    props: { gap: 'C' },
  }
}

const buildGrid = (x, y, template) => {
  const grid = Array.from({ length: parseInt(x) * parseInt(y) }, () => ({ ...template}))
  return grid
}

export const GridAtom = {
  props: {
    aspectRatio: '1/1',
    width: '26px',
    height: '26px',
    borderRadius: '2px'
  },
}

const changeFooter = (clickedX, clickedY) => {
  const footer = document.getElementsByTagName('footer')[0]
  const changeGrid = footer.childNodes

  changeGrid.forEach((element) => {
    
    if (element.getAttribute('key') === 'Text_coords') {
      element.innerText = `Total cells selected: ${clickedY}, ${clickedX}`
    }

    if (element.getAttribute('key') === 'Text_total') {
      element.innerText = `Total cells selected: ${clickedY * clickedX}`
    }
  })
}

export const GridSelection = {
  extend: Grid,
  props: (element) => ({
    clickedX: element.state.x,
    clickedY: element.state.y,
    templateColumns: `repeat(${element.props.tableY}, 1fr)`,
    templateRows: `repeat(${element.props.tableX}, 1fr)`,
    gap: '4px',
    borderRadius: '6px',
    overflow: 'hidden',
    padding: 'Z',
  }),
  childExtend: {
    extend: Grid,
    props: ({state}) => ({
      background: (state.x <= state.parent.x & state.y <= state.parent.y & state.parent.isActive) 
        ? '#3D7BD9' 
        : '#E8F1FF',
      ":hover": {
        background: '#3D7BD9',
        cursor: 'pointer',
      },
    }),
    state: { x: null, y: null, isActive: false },
    on: {
      render: (element, state) => {
        clickedX = Math.floor(parseInt(element.key) / 16) + 1
        clickedY = (parseInt(element.key) % 16) + 1
        state.update({ 
          x: clickedX, 
          y: clickedY,
        })
      },
      click: (event, element, state) => {
        clickedX = Math.floor(parseInt(element.key) / 16) + 1
        clickedY = (parseInt(element.key) % 16) + 1

        changeFooter(clickedX, clickedY)

        state.parent.x === state.x & state.parent.y === state.y 
        ? state.parent.update({ 
          isActive: !state.parent.isActive,
        })
        : state.parent.update({ 
            x: clickedX, 
            y: clickedY,
            isActive: true,
          })
      },
    },
  },
  $setCollection: (param, el, state) => {
    return buildGrid(param.props.tableX, param.props.tableY, GridAtom)
  }
}

export const GridContainer = {
  extend: Flex,
  props: {
    flow: 'column',
    padding: 'Z B',
    align: 'center center',
    tableX: 0,
    tableY: 0,
    background: '#FFF',
    borderRadius: '16px',
    padding: '20px',
  },
  Header: {text: 'Grid Selection'},
  GridSelection: ({props}) => ({tableX: props.tableX, tableY: props.tableY}),
  Footer: ({state}) => ({selectedCell: state.selectedCell}),
}

export const Footer = {
  extend: Flex,
  props: (element, state) => ({
    padding: 'Z B',
    order: 9,
    width: '100%',
    color: '#000',
    align: 'center space-between',
  }),
  Text_coords: {text: 'No cell selected'},
  Text_total: {text: 'No cell selected'},
}