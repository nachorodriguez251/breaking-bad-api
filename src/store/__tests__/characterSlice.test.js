import { afterEach } from '@jest/globals';
import { beforeEach, describe } from 'jest-circus';
import moxios from 'moxios';
import characterReducer, {
    setCharacters,
    setCharactersLoading,
    setDetailsLoading,
    switchLanguage,
    setPage
  } from '../characterSlice';

describe('character reducer tests', () => {
  const initialState = {
    characters: [],
    loading: false,
    details: [],
    detailsLoading: false,
    page: 1,
    lang: 'en'
  };
  test('should handle initial state', () => {
    expect(characterReducer(undefined, { type: 'unknown' })).toEqual({
      characters: [],
      loading: false,
      details: [],
      detailsLoading: false,
      page: 1,
      lang: 'en'
    });
  });

  test('setting loading', () => {
    const actual = characterReducer(initialState, setCharactersLoading());
    expect(actual.loading).toEqual(true);
  });

  test('setting detailsLoading', () => {
    const actual = characterReducer(initialState, setDetailsLoading());
    expect(actual.detailsLoading).toEqual(true);
  });

  test('setting language', () => {
    const actual = characterReducer(initialState, switchLanguage());
    expect(actual.lang).toEqual('es');
  });

  test('setting page', () => {
    const actual = characterReducer(initialState, setPage(2));
    expect(actual.page).toEqual(2);
  });
});

describe('character reducer async tests', () => {
  const initialState = {
    characters: [],
    loading: false,
    details: [],
    detailsLoading: false,
    page: 1,
    lang: 'en'
  };

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('fetching characters', () => {
    const response = moxios.stubRequest('https://breakingbadapi.com/api/characters?limit=2', {
        status: 200,
        response: [
            {
            char_id: 1,
            name: 'Walter White',
            img: 'ww.jpg'
            },
            {
            char_id: 2,
            name: 'Jesse Pinkman',
            img: 'jp.jpg'
            }
        ]
    })
    const actual = characterReducer(initialState, setCharacters(response));
    expect(actual.characters).toEqual(response);
    expect(actual.loading).toEqual(false);
  });
})