import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import './Home.css'
import Admin from './Components/Admin'
const Home = () => {
  const{user}=useOutletContext()
  const navigate=useNavigate()
  const[index,setIndex]=useState(0)
  const images = [
  { img: '/banner1.jpg', path: '/cloths' },
  { img: '/banner4.jpg', path: '/Mobiles' },
  { img: '/banner2.jpg', path: '/funitures' }
]
  useEffect(()=>{
    const interval=setInterval(()=>{
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  },[])
  if(user?.role?.toLowerCase() === 'admin') {
    return <Admin />
  }
  return (
    <div className='total'>
      <nav className='nav'>
        <ul className='ul'>
          <li><Link to="/Mobiles">Mobiles</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/funitures">Funitures</Link></li>
          <li><Link to="/cloths">Clothes</Link></li>
          <li><Link to="/toys">Toys</Link></li>
        </ul>
      </nav>
      <div className='slider'>
        <div
          className='slider-images'
          style={{
            transform: `translateX(-${index * 100}%)`
          }}>
          {images.map((item, i) => (
            <img src={item.img} key={i} alt={`Banner ${i + 1}`} onClick={()=>navigate(item.path)}/>
          ))}
        </div>
        <div className='topItems'>
          <h3>Top Mobile Deals</h3>
          <div className='mobiledeals'>
          <div>
            <img src='/mtop1.jpg' onClick={()=>navigate('/mobiles')}/>
            <p>LAVA Virat Curve 5G (Makrana Ivory, 128 GB)</p>
            <b>₹69,000</b>
          </div>
          <div>
            <img src='/mtop2.jpg' onClick={()=>navigate('/mobiles')}/>
            <p>iPhone 18 Pro Max (2 TB) - Glacier</p>
            <b>₹3,13,400</b>
          </div>
          <div>
            <img src='/mtop3.jpg' onClick={()=>navigate('/mobiles')}/>
            <p>16 Pro+ 5G Smartphone 8+256GB Grey</p>
            <b>₹55,900</b>
          </div>
          <div>
            <img src='/mtop4.jpg' onClick={()=>navigate('/mobiles')}/>
            <p>Samsung Galaxy S25 Ultra 5G...</p>
            <b>₹99,900</b>
          </div>
          <div>
            <img src='/mtop5.jpg' onClick={()=>navigate('/mobiles')}/>
            <p>realme P4 Lite (Sea Blue, 4GB, 64GB)</p>
            <b>₹12,000</b>
          </div>
          </div>
        </div>
      </div>
      <div className='HotDeals'>
        <h3>Hot Deals</h3>
          <div className='hdeals'>
            <div>
              <img src='/hd1.jpg' onClick={()=>navigate('/toys')}/>
              <p>Skillmatics Silicone Ra...</p>
              <b>₹889</b>
            </div>
            <div>
              <img src='/hd2.webp' onClick={()=>navigate('/toys')}/>
              <p>Playpulse® 1 Year Warranty Kids Instant...</p>
              <b>₹2,499</b>
            </div>
            <div>
              <img src='/hd3.webp' onClick={()=>navigate('/cloths')}/>
              <p>IndoPrimo Men’s Premium Cotton Casual Sh...</p>
              <b>₹495</b>
            </div>
            <div>
              <img id='tv' src='/hd4.jpg' onClick={()=>navigate('/electronics')}/>
              <p>TCL 108 cm (43 inches)....</p>
              <b>₹39,000</b>
            </div>
            <div>
              <img id='remote' src='/mtop6.jpg' onClick={()=>navigate('/electronics')}/>
              <p>Certified Refurbished Fire TV Stick...</p>
              <b>₹3,400</b>
            </div>
          </div>
          <div className='h2deals'>
            <div>
            <img src='/mtop7.webp' onClick={()=>navigate('/toys')}/>
            <p>Rainbow Teddy Bear 30cm...</p>
            <b>₹329</b>
            </div>
            <div>
              <img src='/mtop8.jpg' onClick={()=>navigate('/funitures')}/>
              <p>SBF Furniture 2-Tier Wooden...</p>
              <b>₹322</b>
            </div>
            <div>
              <img id='ear' src='/mtop10.webp' onClick={()=>navigate('/electronics')}/>
              <p>Boat Airpots2</p>
              <b>₹1,999</b>
            </div>
            <div>
              <img src='/mtop12.jpg' onClick={()=>navigate('/cloths')}/>
              <p>Toonyport Boys Summer 3 Packs...</p>
              <b>₹498</b>
            </div>
          </div>
      </div>
      <footer className='footer'>
        @all rights are reserverd
      </footer>
    </div>
  )
}

export default Home
