import React, { useState } from 'react'
import { useNavigate, Link, useOutletContext } from 'react-router-dom'
import './Login.css'
const Login = () => {
  const { setUser } = useOutletContext()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (formData.email === 'admin@gmail.com'&&
      formData.password === '123'
    ){
      const admin={
        name: 'Admin',
        email: 'admin@gmail.com',
        role: 'admin'
      }
      setUser(admin)
      alert('Admin Login Successfully')
      navigate('/')
      return
    }
    const response = await fetch('http://localhost:8600/api/get')
    const newData = await response.json()
    const user = newData.find((item) => (
      item.email === formData.email &&
      item.password === formData.password
    ))
    if(user){
      const loggedUser ={
        ...user,
        role:'user'
      }
      alert('Login Successfully')
      setUser(loggedUser)
      navigate('/')
    } else {
      alert('Login Failed')
      navigate('/signup')
    }
  }
return (
    <div className='logincss'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  )
}
export default Login
