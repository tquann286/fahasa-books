import { Layout, Typography } from 'antd'
import cn from 'classnames'

import { useSearch } from '@/hooks'

function BaseLayout({
  children,
  title,
  titleClassName,
  className,
  contentClassName = '',
  options,
  refresh = () => {},
}) {
  const { searchInput } = useSearch(['search'])
  const renderTitle = () => (
    <div className={cn('flex items-center justify-between', titleClassName)}>
      <Typography.Title level={3} className="font-bold">
        {title}
      </Typography.Title>
      {options}
    </div>
  )

  return (
    <Layout className={cn('ant-layout flex !min-h-full flex-col', className)}>
      {title && renderTitle()}
      <main className="mt-3 space-y-4">
        {searchInput({ refresh })}
        <div className={cn(contentClassName)}>{children}</div>
      </main>
    </Layout>
  )
}

export default BaseLayout
