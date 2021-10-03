import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

describe('App tests', () => {
  test('rendering and changing language', () => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByRole('heading', { name: /the breaking bad api/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /characters list/i })).toBeVisible()
    for (let i = 1; i <= 16; i++) {
      expect(screen.getByRole('button', { name: i.toString() })).toBeVisible()
      i === 1
        ? expect(screen.getByRole('button', { name: i.toString() })).toBeDisabled()
        : expect(screen.getByRole('button', { name: i.toString() })).not.toBeDisabled()
    }
    expect(screen.getByRole('button', { name: /cambiar a español/i })).toBeVisible()

    // changing language
    fireEvent.click(screen.getByRole('button', { name: /cambiar a español/i }))
    expect(screen.getByRole('heading', { name: /la api de breaking bad/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /listado de personajes/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /switch to english/i })).toBeVisible()

    // testing disabled buttons after click
    fireEvent.click(screen.getByRole('button', { name: "2" }))
    expect(screen.getByRole('button', { name: "1" })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: "2" })).toBeDisabled()
  })
})
