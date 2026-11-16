import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './Root.css'
const Root = () => {
  const navigate = useNavigate()
  const[search,setSearch]=useState('')
  const handleSearch=(e)=>{
    if(e.key==='Enter'){
      const value=search.toLowerCase()
      if(value.includes('mobiles')||(value.includes('mobile'))){
        navigate('/mobiles')
        setSearch('')
      }
      else if(value.includes('cloths')||value.includes('cloths')){
        navigate('/cloths')
        setSearch('')
      }
      else if(value.includes('funitures')){
        navigate('/funitures')
        setSearch('')
      }
      else if(value.includes('electronics')){
        navigate('/electronics')
        setSearch('')
      }
      else if(value.includes('toys')){
        navigate('/toys')
        setSearch('')
      }else{
        alert('Category not found')
      }
    }
  }
  const [user, setUser]=useState(null)
  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }
  return (
    <div className="root">
      <header className={user?.role==='admin'?'aheader':"header"}>
        <h1 className="logo">Dino</h1>
        <div className="search-container">
        <input type="text" placeholder="Search..." className="search"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        onKeyDown={handleSearch}
        />
        </div>
        <div className={"header-buttons"}>
          {user ? (
            <>
              <h3 id={user?.role==='admin'?'aname':'name'}>👤{user.name}</h3>
              <button onClick={() => navigate('/cart')} id='c1'>
                Cart
              </button>
              <button onClick={() => navigate('/orders')} id='c2'>
                Order Status
              </button>
              <button onClick={handleLogout} id='c3'>
                Logout
              </button>
            </>
          ):(
            <button onClick={() => navigate('/login')} id='c4'>
              Login
            </button>
          )}
        </div>
      </header>
      <main>
        <Outlet context={{setUser,user }} />
      </main>
    </div>
  )
}

export default Root