import { Link, Outlet, useLocation } from 'react-router-dom'
import style from './index.module.less'

type Tab = 'Vue' | 'React'

const PATH_MAP = {
  Vue: '/portal/vue',
  React: '/portal/react',
}

const tabItems: Tab[] = ['React', 'Vue']

function TabItem({ name }: { name: Tab }) {
  const { pathname } = useLocation()
  const className = `${style.tab_item} ${style[name]} ${pathname === PATH_MAP[name] ? style.active : ''}`
  return (
    <Link className={className} to={PATH_MAP[name]}>
      {name}
    </Link>
  )
}

function Portal() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        {tabItems.map((name) => <TabItem key={name} name={name} />)}
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Portal
