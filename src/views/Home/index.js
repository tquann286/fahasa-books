import { useTranslations } from 'use-intl'

const HomeView = () => {
  const t = useTranslations()

  return <div>{t('navigations.book_list')}</div>
}

export default HomeView
