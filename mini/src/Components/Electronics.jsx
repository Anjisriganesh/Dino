import React, { useState, useEffect } from 'react'
import '../Components/Mobile.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
const Electronics=()=>{
  const navigate = useNavigate()
  const {user}=useOutletContext()
  const [mobile, setMobiles] = useState([])
  const isAdmin=user?.role === 'admin'
  const AddToCart=async(item)=>{
    try {
      if (!user) {
        alert('Please Login First')
        navigate('/login')
        return
      }
      const response = await fetch(
        'http://localhost:8600/api/cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: 'electronic',
            quantity: 1,
            email: user.email
          })
        }
      )
      const data=await response.json()
      if (response.ok){
        alert('Added to Cart Successfully')
      } else {
        alert(data.message||'Failed to add cart')
      }
    } catch (error) {
      console.log(error)
    }
  }
const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8600/api/electronics/${id}`,
        {
          method: 'DELETE'
        }
      )
      if (response.ok) {
        setMobiles(prev=>
          prev.filter(item=>item.id!==id)
        )
        alert('Deleted Successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      const getMobiles = async () => {
      try {
        const response = await fetch(
          'http://localhost:8600/api/electronics'
        )
        const data = await response.json()
        setMobiles(data)
      } catch (error) {
        console.log(error)
      }
    }
    getMobiles()
  }, [])
  return(
    <div className="mobile-container">
      <div style={{ display: 'flex', gap: '10px' }}>
        <button id="button" onClick={() => navigate('/')}>← Back</button>
        <h2>Gadgets</h2>
        {isAdmin && (
          <button id='z' onClick={() =>
  navigate('/addItem', {
    state: { category: 'electronics' }
  })
}>
  Add Item
</button>
        )}
      </div>
      <div className="mobile-list">
        {mobile.map((item) => (
          <div className="mobile-card" key={item.id}>
            <img
              src={`http://localhost:8600${item.image}`}
              alt={item.name}
            />
            <div className="mobile-details">
              <h3>{item.name}</h3>
              <div className="rating-price">
                <span className="rating">
                  {item.rating} ★
                </span>
                <div className="price">
                  <span className="new-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              {isAdmin ? (
                <div className='D'>
                  <button id='del' onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              ) : (
                <button id="cart" onClick={() => AddToCart(item)}>
                  Add Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Electronics
