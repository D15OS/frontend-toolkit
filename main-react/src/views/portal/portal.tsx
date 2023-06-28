import { Link, Outlet } from 'react-router-dom'

const TabItem = (props: { name: string }) => {
  const map = {
    Vue: '/portal/vue',
    React: '/portal/react',
  }
  return <Link to={map[props.name as keyof typeof map]}>{props.name}</Link>
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
