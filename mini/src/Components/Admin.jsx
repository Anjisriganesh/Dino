import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Admin.css'

const Admin = () => {
  const [showProducts, setShowProducts] = useState(false)

  return (
    <div className="admin-container">

      <aside className="sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>

            <li>
              <button
                className="product-btn"
                onClick={() => setShowProducts(!showProducts)}
              >
                Products
                <span>{showProducts ? '−' : ''}</span>
              </button>
            </li>

            {showProducts && (
              <ul className="category-list">
                <li><Link to="/Mobiles">Mobiles</Link></li>
                <li><Link to="/electronics">Electronics</Link></li>
                <li><Link to="/funitures">Funitures</Link></li>
                <li><Link to="/cloths">Clothes</Link></li>
                <li><Link to="/toys">Toys</Link></li>
              </ul>
            )}
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
        <h1>Welcome Admin</h1>
        <p>Select a category from the Products menu.</p>
        <Outlet />
      </main>

    </div>
  )
}

export default Admin