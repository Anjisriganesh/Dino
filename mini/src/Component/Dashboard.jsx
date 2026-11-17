import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(0)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const[currentPage,setCurrentPage]=useState(1)
  const[text,setText]=useState('')
  const[email,setEmail]=useState('')
  const[status,setStatus]=useState('')
  const rowPages=5
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productApis = [
          'mobile',
          'electronics',
          'furnitures',
          'cloths',
          'toys'
        ]
        const productResults = await Promise.all(
          productApis.map(async (category) => {
            const res = await fetch(
              `http://localhost:8600/api/${category}`
            )
            return res.json()
          })
        )
        const totalProducts=productResults.reduce(
          (sum,item)=>sum+item.length, 0
        )
        setProducts(totalProducts)
        const orderRes = await fetch(
          'http://localhost:8600/api/allorders?role=admin'
        )
        const orderData = await orderRes.json()
        setOrders(orderData)
        const userRes = await fetch(
          'http://localhost:8600/api/get'
        )
        const userData = await userRes.json()
        setUsers(userData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const pendingOrders=orders.filter(
    order=>order.status==='Pending'
  ).length
  const AcceptedOrders=orders.filter(
    order=>order.status==='Accepted'
  ).length
  const RejectedOrders=orders.filter(
    order=>order.status==='Rejected'
  ).length

  const HandlePrev=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }
  const HandleNext=()=>{
    if(currentPage<totalpages){
      setCurrentPage(currentPage+1)
    }
  }
  const filterorder=orders.filter(item=>{
    const textfilter=text===''||item.orderId.toString().startsWith(text)
    const emailfilter=email===''||item.email.startsWith(email.toLowerCase())
    const statusfilter=status===''||item.status.toLowerCase().startsWith(status.toLowerCase())
    return textfilter&&emailfilter&&statusfilter
  })
  useEffect(()=>{
    setCurrentPage(1)
  },[text,email,status])
  const lastIndex=currentPage*rowPages
  const firstIndex=lastIndex-rowPages
  const orderData=filterorder.slice(firstIndex,lastIndex)
  const totalpages=Math.ceil(orders.length/rowPages)
  return (
    <div className="Dashboardt">
      <div className='DashboardH'>
      <button id="dashboardButton" onClick={() => navigate('/')}>
        ← Back
      </button>
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>Welcome to Admin Dashboard</p>
      </div>
      </div>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Products</h3>
            <h1>{products}</h1>
          </div>
          <div className="dashboard-card">
            <h3>Total Users</h3>
            <h1>{users.length}</h1>
          </div>
          <div className="dashboard-card">
            <h3>Total Orders</h3>
            <h1>{orders.length}</h1>
          </div>
          <div className="dashboard-card">
            <h3>Pending Orders</h3>
            <h1>{pendingOrders}</h1>
          </div>
          <div className="dashboard-card">
            <h3>Accepted Orders</h3>
            <h1>{AcceptedOrders}</h1>
          </div>
          <div className="dashboard-card">
            <h3>Rejected Orders</h3>
            <h1>{RejectedOrders}</h1>
          </div>
        </div>
        <div className='recentOrder'>
          <h2 id='recenth2'>Recent Orders</h2>
          <div className='sea'>
          <input type='number' placeholder='Enter your Id'
          value={text}
          onChange={(e)=>setText(e.target.value)}/>
          <input type='email' placeholder='Enter your Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type='' placeholder='Enter Status'
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          />
          </div>
          <div className='recentT'>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((item,index)=>{
                  return(
                  <tr key={index}>
                    <td>{item.orderId}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td>{item.date}</td>
                    <td>₹{item.total}</td>
                  </tr>
                )})}
              </tbody>
            </table>
            <div className='keys'>
            <button id='prev' onClick={HandlePrev}>Prev</button>
            <p>{currentPage}</p>
            <button id='next' onClick={HandleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
