import Head from 'next/head'
import { APP_NAME } from '@/constants/Constants'

const HeadNext = ({ title, description, url, image }) => {
  return (
    <Head>
      {title && (
        <title>
          {title} - {APP_NAME}
        </title>
      )}
      {description && <meta name="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta name="keywords" content="coi,タマヌオイル,モリンガオイル,ベトナム土産,ホーチミン" />
    </Head>
  )
}

export default HeadNext
