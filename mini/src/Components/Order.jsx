import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './Order.css'
const Orders = () => {
  const { user } = useOutletContext()
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const getOrders = useCallback(async()=>{
  if (!user) return
  try {
    const response = await fetch(
      `http://localhost:8600/api/allorders?email=${encodeURIComponent(user.email)}&role=${user.role}`
    )
    const data = await response.json()
    if (response.ok) {
      const sortedOrders = [...data].sort((a,b) => {
        return new Date(b.date)-new Date(a.date)
      })
      setOrders(sortedOrders)
    }
  } catch (error) {
    console.log(error)
  }
}, [user])
  useEffect(() => {
    getOrders()
  },[getOrders])
const updateStatus = async(orderId,status)=>{
    try {
      const response = await fetch(
        `http://localhost:8600/api/allorders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert(data.message)
        getOrders()
        navigate('/')
      }else{
        alert(data.message)
      }
    }catch(error){
      console.log(error)
      alert('Something went wrong')
    }
  }
  if (!user){
    return <h3>Please Login</h3>
  }
  return (
    <div className="t">
      <button id='btn' onClick={() => navigate('/')}>
        ← Back
      </button>
      <h2 id='h'>
        {user.role === 'admin'?'All Orders':'My Orders'}
      </h2>
      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div key={order.orderId}>
            <h3>Order ID: {order.orderId}</h3>
            <p>User Email: {order.email}</p>
            <p>
              Date: {new Date(order.date).toLocaleString()}
            </p>
            <h4>Products</h4>
            {order.items.map((item, index) => (
              <div className="order-product" key={`${item.id}-${index}`}>
                  <div className="product-left">
                <img
                  src={`http://localhost:8600${item.image}`}
                  alt={item.name}
                  width="100"
                />
                </div>
                <div className="product-right">
                <p>{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Total: ₹{item.price * item.quantity}
                </p>
                </div>
              </div>
            ))}
      {user.role ==='admin'&&(
  <>
    {/* <h3 className={`order-status ${(order.status || 'Pending').toLowerCase()}`}>
      Order Status: {order.status || 'Pending'}
    </h3> */}
    {order.status === 'Pending' && (
      <>
        <button onClick={()=>updateStatus(order.orderId,'Accepted')}>
          Accept
        </button>
        <button onClick={()=>updateStatus(order.orderId,'Rejected')}>
          Reject
        </button>
      </>
    )}
  </>
)}
    {user.role !== 'admin'&&(
    <h3 className={`order-status ${(order.status || 'Pending').toLowerCase()}`}>
    Order Status: {order.status || 'Pending'}
    </h3>
    )}
    <hr/>
    </div>
  ))
    )}
    </div>
  )
}
export default Orders
