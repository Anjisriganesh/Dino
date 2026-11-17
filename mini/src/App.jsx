import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Home'
import Root from './Root'
import Login from './Login'
import Signup from './Signup'
import Mobiles from './Components/Mobiles'
import Funitures from './Components/Funitures'
import Cloths from './Components/Cloths'
import Toys from './Components/Toys'
import Cart from './Components/Cart'
import AddItem from './Components/AddItem'
import Orders from './Components/Order'
import Electronics from './Components/Electronics'
import Dashboard from './Component/Dashboard'
const App = () => {
  const router=createBrowserRouter(
    [
    {path:'/', element:<Root/>,
    children:[
    {path:'/', element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/signup',element:<Signup/>},
    {path:'/Mobiles',element:<Mobiles/>},
    {path:'/electronics',element:<Electronics/>},
    {path:'/funitures',element:<Funitures/>},
    {path:'/cloths',element:<Cloths/>},
    {path:'/toys',element:<Toys/>},
    {path:'/cart',element:<Cart/>},
    {path:'/addItem',element:<AddItem/>},
    {path:'/orders',element:<Orders/>},
    {path:'/dashboard',element:<Dashboard/>}
  ]}])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
