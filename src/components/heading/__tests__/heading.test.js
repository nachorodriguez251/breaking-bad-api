import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'


import Heading from '../Heading'


describe('Heading tests', () => {
  test('render heading', () => {
    render(<Heading>Page title</Heading>)
    expect(screen.getByRole('heading', {name: /page title/i})).toBeVisible()
  })
})