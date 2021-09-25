import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import characterReducer from './characterSlice'

export const store = configureStore({
  reducer: {
    characters: characterReducer
  },
})

export const persistor = persistStore(store)