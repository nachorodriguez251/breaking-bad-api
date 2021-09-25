import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectLanguage } from '../../store/characterSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import './PageNotFound.scss'

function PageNotFound() {
  const { t, i18n } = useTranslation()
  const lang = useSelector(selectLanguage)

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])
  
  return (
    <div className="not-found">
      <div className="not-found-title">{t("notfound")}</div>
      <Link type="button" className="details-link" to={'/'}>
        {t("details.return")}
      </Link>
    </div>
  )
}

export default PageNotFound
