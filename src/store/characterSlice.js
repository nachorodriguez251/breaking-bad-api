import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'

const persistConfig = {
  key: 'root',
  storage,
}

const initialState = {
  characters: [],
  loading: false,
  details: [],
  detailsLoading: false,
  page: 1,
  lang: 'en'
}

export const fetchDetails = createAsyncThunk(
  'characters/fetchDetails',
  async (id, { rejectWithValue }) => {
    const res = await axios.get(`https://breakingbadapi.com/api/characters/${id}`)
    const author = res.data[0].name.replace(' ', '+')
    const quote = await axios.get(`https://breakingbadapi.com/api/quote/random?author=${author}`)
    if (!quote.data.length) {
      return rejectWithValue({ ...res.data[0], quote: '' });
    }
    return ({ ...res.data[0], quote: quote.data[0].quote })
  }
);

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCharactersLoading: (state) => {
      state.loading = true
    },
    setCharacters: (state, { payload }) => {
      state.loading = false
      state.characters = payload
    },
    setDetailsLoading: (state) => {
      state.detailsLoading = true
    },
    switchLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'es' : 'en'
    },
    setPage: (state, { payload }) => {
      state.page = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, { payload }) => {
        state.detailsLoading = false;
        state.details = payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.details = action.payload;
      })
  },
})

export const { setCharacters, setCharactersLoading, setPage, setDetailsLoading, setQuote, switchLanguage } = characterSlice.actions;

export const selectCharacters = (state) => state.characters.characters
export const selectDetails = (state) => state.characters.details
export const selectDetailsLoading = (state) => state.characters.detailsLoading
export const selectLoading = (state) => state.characters.loading
export const selectPage = (state) => state.characters.page
export const selectLanguage = (state) => state.characters.lang

// export default characterSlice.reducer
export default persistReducer(persistConfig, characterSlice.reducer)