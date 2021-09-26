import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from '../Card'
import { Provider } from 'react-redux';
import { store } from '../../../store'
import { BrowserRouter } from 'react-router-dom';

describe('card tests', () => {
  test('render card', () => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    render(
      <Provider store={store}>
       <BrowserRouter>
        <Card id={1} img="img" name="character name" />
       </BrowserRouter>
     </Provider>
    )
    expect(screen.getByRole('img', {name: /character name/i})).toBeVisible()
    expect(screen.getByRole('link', {name: /character name/i})).toBeVisible()
  })
})