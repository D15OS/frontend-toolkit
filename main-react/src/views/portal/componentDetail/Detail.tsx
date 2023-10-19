import React from 'react'
import { useLocation } from 'react-router-dom'
// get all components
const componentMapping = import.meta.glob(
  '/src/components/**/*.tsx',
)
console.log(componentMapping)

const values = Object.values(componentMapping)
const MyComponents = React.lazy(values[0])

function Detail() {
  console.log(1)
  return (
    <MyComponents />
  )
}
export default Detail
