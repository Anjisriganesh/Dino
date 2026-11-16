import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './Root.css'
const Root = () => {
  const navigate = useNavigate()
  const[search,setSearch]=useState('')
  const[darkMode,setDarkMode]=useState(false)
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
  const toggleTheme=()=>{
    setDarkMode(prev=>!prev)
  }
  return (
    <div className="root">
      <header className={`${user?.role === 'admin' ? 'aheader' : 'header'} ${darkMode ? 'dark' : 'light'}`}>
        <h1 className="logo">Dino</h1>
        <div className={user?.role==='user'?"search-container":'adminSearch'}>
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
              {user?.role==='user'&&<><button onClick={() => navigate('/cart')} id='c1'>
                Cart
              </button>
              <button onClick={() => navigate('/orders')} id='c2'>
                Order Status
              </button></>}
              {user?.role==='admin'&&
                <>
                <button onClick={toggleTheme} className='"theme-btn"'>{darkMode ? '🌙' : '☀️'}</button>
                </>
              }
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
        <Outlet context={{setUser,user,darkMode}} />
      </main>
    </div>
  )
}

export default Root