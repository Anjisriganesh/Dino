import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
const Signup = () => {
  const navigate=useNavigate()
    const[formData,setFormData]=useState({
        name:'',
        email:'',
        number:'',
        password:'',
        Confirmpassword:''
    })
    const HandleFormData=(e)=>{
      const {name,value}=e.target
      setFormData({
        ...formData,
        [name]:value
      })
    }
    const Data=async(e)=>{
      e.preventDefault()
      if(formData.password!==formData.Confirmpassword){
        alert('password Does not Match')
        return
      }
      try{
      const response=await fetch('http://localhost:8600/api/post',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const msg=await response.json()
      if(response.ok){
        alert(msg.message)
        navigate('/login')
      }
    }catch(error){
      console.log(error)
    }
    }
  return (
    <div className="signupcss">
      <h3 id='sr'>Registration Form</h3>
      <form onSubmit={Data}>
        <input type='text' name='name' value={formData.name} placeholder='Enter your Name' 
            onChange={HandleFormData} required/>
        <input type='email' name='email' value={formData.email} placeholder='Enter your Email'
            onChange={HandleFormData} required/>
        <input type='tel' name='number' value={formData.number} placeholder='Enter Mobile Number'
            onChange={HandleFormData}required/>
        <input type='password' name='password' value={formData.password} placeholder='Enter password'
         onChange={HandleFormData} required/>
        <input type='password' name='Confirmpassword' value={formData.Confirmpassword} placeholder='Confirm-password'
        onChange={HandleFormData} required/>
        <button id='ss' type='submit'>Submit</button>
      </form>
        <p>Already have an account?<button id='sl'onClick={()=>navigate('/login')}>Login</button></p>
    </div>
  )
}

export default Signup
