import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom';
import { selectDetails, selectDetailsLoading, switchLanguage, selectLanguage, fetchDetails } from '../../store/characterSlice'
import './details.scss'
import '../../i18n'

import Heading from '../heading/Heading';



function Details() {
  const dispatch = useDispatch()
  const lang = useSelector(selectLanguage)
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const loading = useSelector(selectDetailsLoading)
  const details = useSelector(selectDetails)

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  useEffect(() => {
    if (id != details.char_id) dispatch(fetchDetails(id))
  }, [])

  return (
    <>
      {
        loading ?
          <div className="loading">{t("loading")}</div>
          :
          <div className="details">
            <Heading>IDENTIKIT </Heading>
            <div className="details-card">
              <img src={details.img} alt={details.name} height='300' width='225' />
              <div className="details-card-attributes">
                <div className="details-attributes-name">
                  {t("details.name")}: {details.name}
                </div>
                <div className="details-attributes-nickname">
                  {t("details.nickname")}: {details.nickname}
                </div>
                <div className="details-attributes-birthday">
                  {t("details.birthday")}: {details.birthday}
                </div>
                <div className="details-attributes-occupation">
                  {t("details.occupation")}: {details.occupation.join(', ')}
                </div>
                <div className="details-attributes-status">
                  {t("details.status")}: {details.status}
                </div>
                {t("details.quote")}: {details.quote ? details.quote : "-"}
              </div>
            </div>
            <Link type="button" className="details-link" to={'/'}>
              {t("details.return")}
            </Link>
            <a type="button" onClick={() => dispatch(switchLanguage())} className="lang">{t("lang")}</a>

          </div>

      }
    </>
  )
}

export default Details
