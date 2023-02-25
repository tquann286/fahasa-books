import { useTranslations } from 'use-intl'

import AppsLayout from '@/layouts/AppLayout'
import HomeView from '@/views/Home'
import HeadNext from '@/components/base/HeadNext'

const HomePage = () => {
  const t = useTranslations()

  return (
    <>
      <HeadNext title={t('head_title.book_list')} />
      <HomeView />
    </>
  )
}

HomePage.Layout = AppsLayout

export default HomePage
