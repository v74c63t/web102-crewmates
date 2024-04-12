
import './NavBar.css'
import { Link, Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <div className='side-bar'>
        <div className='nav-bar'>
          <ul className="nav-bar-list">
            <li>
              <Link className='link' to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className='link' to="/create">
                Create a Character
              </Link>
            </li>
            <li>
              <Link className='link' to="/view">
                Character Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="page">
        <Outlet />
      </div>
    </div>
  )
}

export default NavBar