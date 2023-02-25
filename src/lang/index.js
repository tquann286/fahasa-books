import enNext from './en_next'
import viNext from './vi_next'

function getLangMessage(locale) {
  console.log('locale: ', locale)

  return {
    en: enNext,
    vi: viNext,
  }[locale]
}

export default getLangMessage
