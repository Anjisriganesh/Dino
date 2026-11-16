import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './Cart.css'
const Cart = () => {
  const { user } = useOutletContext()
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const HandleBuy=async()=>{
    const confirmOrder = window.confirm(
      'Are you sure you want to place this order?'
    )
    if (!confirmOrder) return
    try {
      const response = await fetch(
        'http://localhost:8600/api/buy',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:user.email
          })
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert('Order Successfully Placed!')
        navigate('/')
        setCart([])
      } else {
        alert(data.message || 'Order failed')
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong')
    }
  }
  const getCart = useCallback(async () => {
    if (!user) return
    try {
      const response = await fetch(
        `http://localhost:8600/api/cartget?email=${encodeURIComponent(user.email)}&role=${user.role}`
      )
      const data = await response.json()
      if (response.ok) {
        setCart(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])
  useEffect(() => {
    getCart()
  }, [getCart])
 const updateQuantity = async (item, quantity) => {
    try {
      const response = await fetch(
        `http://localhost:8600/api/cart/${item.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          email: item.email,
          quantity,
          category: item.category
        })
        }
      )
      if (response.ok) {
        getCart()
      }
    } catch (error) {
      console.log(error)
    }
}
  const Increase = (item)=>{
    updateQuantity(item, item.quantity + 1)
  }
  const Decrease = (item)=>{
    if (item.quantity > 1){
      updateQuantity(item, item.quantity - 1)
    }
  }
 const Remove = async(item)=>{
    try {
      const response = await fetch(
        `http://localhost:8600/api/cart/${item.id}?email=${encodeURIComponent(item.email)}&category=${item.category}`,
        {
          method: 'DELETE'
        }
      )
      if (response.ok) {
        getCart()
      }
    }catch(error){
      console.log(error)
    }
  }
 const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity,0)
  if (!user) {
    return <h3>Please Login</h3>
  }
  return (
    <div className="t">
      <button id="btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      <h2 id='h'>
        {user.role === 'admin'?'All Users Cart':'My Cart'}
      </h2>
      {cart.length === 0?(
        <h3>
          {user.role === 'admin'
            ? 'No users have added products to cart'
            : 'Your Cart is Empty'}
        </h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div  className="cart-item" key={`${item.email}-${item.id}-${index}`}>
              <img
                src={`http://localhost:8600${item.image}`}
                alt={item.name}
                width="100"
              />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Total: ₹{item.price * item.quantity}
              </p>
              {user.role === 'admin' ? (
                <p>User Email: {item.email}</p>
              ) : (
                <>
                  <button id='minus'
                    onClick={() => Decrease(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span> {item.quantity} </span>
                  <button id='plus'onClick={() => Increase(item)}>
                    +
                  </button>
                  <button id='r' onClick={() => Remove(item)}>
                    Remove
                  </button>
                </>
              )}
              <hr />
            </div>
          ))}
          <h2 id='x'>Grand Total: ₹{grandTotal}</h2>
          {user.role !== 'admin' && (
            <button id='s' onClick={HandleBuy}>
              Buy Now
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
