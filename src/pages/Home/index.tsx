import React from 'react'

export default function Home() {
  React.useEffect(() => {
    console.log('Home')
  }, [])
  
  return (
    <h1>Welcome to human resource management system.</h1>
  )
}
