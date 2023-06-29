import { Link, Outlet } from 'react-router-dom'

type Tab = 'Vue' | 'React'
const TabItem = (props: { name: Tab }) => {
  const TAB_MAP = {
    Vue: '/portal/vue',
    React: '/portal/react',
  }
  return (
    <Link className='m-4' to={TAB_MAP[props.name]}>
      {props.name}
    </Link>
  )
}
const Portal = () => {
  return (
    <div className='container'>
      <header>
        <TabItem name='Vue'></TabItem>
        <TabItem name='React'></TabItem>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Portal
