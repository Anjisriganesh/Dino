import React, { useState } from 'react'
import { Link, useOutletContext} from 'react-router-dom'
import './Admin.css'
const Admin = () => {
  const [show, setShow] = useState(false)
  const {darkMode}=useOutletContext()
  const HandleProducts = () => {
    setShow(prev => !prev)
  }
  return (
    <div className='admint'>
      <aside className={`adminnav ${darkMode?'dark':'light'}`}>
        <h2>Admin Portal</h2>
        <nav>
          <ul>
            <li>
              <button>Dashboard</button>
            </li>
            <li>
              <button onClick={HandleProducts}>
                Products
              </button>
              {show && (
                <div className="dropdown">
                  <Link to="/mobiles">Mobiles</Link>
                  <Link to="/electronics">Electronics</Link>
                  <Link to="/funitures">Funitures</Link>
                  <Link to="/cloths">Dresses</Link>
                  <Link to="/toys">Toys</Link>
                </div>
              )}
          </li>
          <Link id='s1' to='/cart'>Cart</Link>
          <Link id='s2' to='/orders'>All Orders</Link>
        </ul>
      </nav>
    </aside>
    <div className='headerx'>
      <img src='/logo2.jpg'/>
      <h2>Welcome Admin</h2>
    </div>
    </div >
  )
}

export default Admin
