import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AddItem.css'
const AddItem = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const category = location.state?.category || 'mobile'
  const [formData, setFormData] = useState({
    name:'',
    price:'',
    rating:''
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      alert('Please select an image')
      return
    }
    const data = new FormData()
    data.append('name', formData.name)
    data.append('price', formData.price)
    data.append('rating', formData.rating)
    data.append('image', image)

    try {
      const response = await fetch(
        `http://localhost:8600/api/${category}`,
        {
          method: 'POST',
          body: data
        }
      )
      const result = await response.json()
      if (response.ok) {
        alert('Item Added Successfully')
        navigate('/')
      }else {
        alert(result.message || 'Failed to Add Item')
      }

    } catch (error) {
      console.log(error)
      alert('Server Error')
    }
  }
  return (
    <div className='addItemtotal'>
    <button id='btnBack' onClick={()=>navigate('/')}>← Back</button>
    <div className='addItem'>
      <h2 id='addh'>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br/><br/>
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br/><br/>
        <input
          type="number"
          name="rating"
          placeholder="Enter Rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
        <br/><br/>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />
        <br/><br/>
        {preview && (
          <img src={preview} alt="Preview" width="150" />
        )}
        <br/><br/>
        <button id='addItembtn' type="submit">
          Add Item
        </button>
      </form>
      </div>
    </div>
  )
}

export default AddItem
