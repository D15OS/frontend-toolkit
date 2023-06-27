const TabItem = (props: { name: string }) => {
  return <span>{props.name}</span>
}
const Portal = () => {
  return (
    <div className='container'>
      <header>
        <TabItem name='Vue'></TabItem>
        <TabItem name='React'></TabItem>
      </header>
      <main>
        
      </main>
    </div>
  )
}

export default Portal
