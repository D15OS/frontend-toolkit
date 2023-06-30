import { Link, Outlet } from 'react-router-dom'
import style from './index.module.css'
type Tab = 'Vue' | 'React'
const TabItem = (props: { name: Tab }) => {
  const TAB_MAP = {
    Vue: '/portal/vue',
    React: '/portal/react',
  }
  return (
    <Link className={style['tab-item'] + 'm-4 vue'} to={TAB_MAP[props.name]}>
      {props.name}
    </Link>
  )
}
const Portal = () => {
  return (
    <div className={style['container']}>
      <header className={style['header']}>
        <TabItem name='Vue'></TabItem>
        <TabItem name='React'></TabItem>
      </header>
      <main className={style['main']}>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Portal
