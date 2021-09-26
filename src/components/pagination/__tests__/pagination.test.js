import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '../Pagination'
import { Provider } from 'react-redux';
import { store } from '../../../store'

describe('pagination tests', () => {
  test('render pages, and calling handler', () => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    const paginate = jest.fn()
    render(
     <Provider store={store}>
        <Pagination totalCharacters={8} charactersPerPage={4} paginate={paginate} />
     </Provider>
    )

    expect(screen.getByRole('button', {name: "1"})).toBeVisible()
    expect(screen.getByRole('button', {name: "2"})).toBeVisible()
    expect(screen.getByRole('button', {name: "1"})).toBeDisabled()
    expect(screen.getByRole('button', {name: "2"})).not.toBeDisabled()

    fireEvent.click(screen.getByRole('button', {name: "1"}))
    expect(paginate).toHaveBeenCalled()
  })
})