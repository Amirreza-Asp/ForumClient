import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../app/utility/SD'

interface Props{
    toggleClose : () => void, 
    close : boolean
}

export default function HeaderLogo({toggleClose , close} : Props) {
  return (
  <div className="header-nav-logo">
  <div className={`header-nav-logo-hamburger ${close ? "" : "active"}`} onClick={toggleClose}>
    <span className="line-1"></span>
    <span className="line-2"></span>
    <span className="line-3"></span>
  </div>
  <Link to={routes.Home}>
  <img
    src="assets/images/arila.png"
    alt="ARILA"
    className="header-nav-logo-img"
  />
  </Link>
</div>
  )
}
