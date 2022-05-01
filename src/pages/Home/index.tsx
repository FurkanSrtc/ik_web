import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  React.useEffect(() => {
    console.log('Home')
  }, [])

  return (
<div className="flexing">
    <div className="section section--first-color">
    <Link to="/candidates" style={{color:"#474E5D"}}>
        <h3 className="title">Candidates</h3>
        </Link>
    </div>
    <div className="section section--second-color">
      <Link to="/about-us" style={{color:"#b3b0aa"}}>
        <h3 className="title">About Us</h3>
        </Link>
    </div>

</div>
  )
}
