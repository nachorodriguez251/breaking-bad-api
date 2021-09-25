import React, { useEffect } from 'react'
import Card from '../card/Card'
import Heading from '../heading/Heading'
import Pagination from '../pagination/Pagination';
import axios from 'axios'
import './main.scss'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import '../../i18n'
import {
  setCharacters,
  setCharactersLoading,
  selectLoading,
  selectCharacters,
  selectPage,
  setPage,
  switchLanguage,
  selectLanguage
} from '../../store/characterSlice'

function Main() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const characters = useSelector(selectCharacters)
  const loading = useSelector(selectLoading)
  const page = useSelector(selectPage)
  const lang = useSelector(selectLanguage)
  const paginate = (pageNumber) => dispatch(setPage(pageNumber))


  useEffect(() => {
    dispatch(setCharactersLoading())
    axios.get(`https://breakingbadapi.com/api/characters?limit=4&offset=${(page - 1) * 4}`)
      .then(res => {
        dispatch(setCharacters(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [page])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <div className="main">
      <Heading>{t("main.title")}</Heading>
      <Heading level='2'>{t("main.subtitle")}</Heading>
      <div className="main-list">
        {
          loading ? <div className="loading">{t("loading")}</div> :
            characters.map((character) =>
              <Card id={character.char_id} img={character.img} key={character.char_id} name={character.name} />
            )}
      </div>
      <Pagination totalCharacters="62" charactersPerPage='4' paginate={paginate} />
      <a type="button" onClick={() => dispatch(switchLanguage())} className="lang">{t("lang")}</a>
    </div>
  )
}

export default Main
