import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
const app = express()
const port = 8600
app.use(cors())
app.use(express.json())
app.use('/Images', express.static('Images'))
if (!fs.existsSync('./Images')) {
  fs.mkdirSync('./Images', { recursive: true })
}
const readData = (file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]')
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}
const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Images')
  },
filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})
const categoryFiles={
  mobile: 'Mobile.json',
  electronics: 'Electronics.json',
  furnitures: 'Funitures.json',
  cloths: 'Cloths.json',
  toys: 'Toys.json'
}
app.post('/api/post', (req, res) => {
  try {
    const data = readData('ShoppingData.json')
    const newUser = {
      id: Date.now(),
      ...req.body
    }
    data.push(newUser)
    writeData('ShoppingData.json', data)
    res.status(201).json({
      message: 'Signup successful',
      user: newUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
app.get('/api/get', (req, res) => {
  try {
    res.json(readData('ShoppingData.json'))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
const getProducts = (category) => {
  return (req, res) => {
    try {
      res.json(readData(categoryFiles[category]))
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
app.get('/api/mobile', getProducts('mobile'))
app.get('/api/electronics', getProducts('electronics'))
app.get('/api/furnitures', getProducts('furnitures'))
app.get('/api/Cloths', getProducts('cloths'))
app.get('/api/Toys', getProducts('toys'))
const addProduct = (category) => {
  return (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'Please select an image'
        })
      }
      const file = categoryFiles[category]
      const data = readData(file)
      const newItem = {
        id: Date.now(),
        name: req.body.name,
        price: Number(req.body.price),
        rating: Number(req.body.rating),
        image: `/Images/${req.file.filename}`
      }
      data.push(newItem)
      writeData(file, data)
      res.status(201).json({
        message: 'Product Added Successfully',
        item: newItem
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
app.post('/api/mobile', upload.single('image'), addProduct('mobile'))
app.post('/api/electronics', upload.single('image'), addProduct('electronics'))
app.post('/api/furnitures', upload.single('image'), addProduct('furnitures'))
app.post('/api/cloths', upload.single('image'), addProduct('cloths'))
app.post('/api/toys', upload.single('image'), addProduct('toys'))
const updateProduct = (category) => {
  return (req, res) => {
    try {
      const file = categoryFiles[category]
      const data = readData(file)
      const index = data.findIndex(
        item => item.id == req.params.id
      )
      if (index === -1) {
        return res.status(404).json({ message: 'Product not found' })
      }
      data[index] = {
        ...data[index],
        name: req.body.name ?? data[index].name,
        price: req.body.price !== undefined
          ? Number(req.body.price)
          : data[index].price,
        rating: req.body.rating !== undefined
          ? Number(req.body.rating)
          : data[index].rating
      }
      if (req.file) {
        data[index].image = `/Images/${req.file.filename}`
      }
      writeData(file, data)
      res.json({
        message: 'Product Updated Successfully',
        item: data[index]
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
app.put('/api/mobile/:id', upload.single('image'), updateProduct('mobile'))
app.put('/api/electronics/:id', upload.single('image'), updateProduct('electronics'))
app.put('/api/furnitures/:id', upload.single('image'), updateProduct('furnitures'))
app.put('/api/cloths/:id', upload.single('image'), updateProduct('cloths'))
app.put('/api/toys/:id', upload.single('image'), updateProduct('toys'))
const deleteProduct = (category) => {
  return (req, res) => {
    try {
      const file = categoryFiles[category]
      const data = readData(file)
      const filteredData = data.filter(
        item => item.id != req.params.id
      )
      if (filteredData.length === data.length) {
        return res.status(404).json({ message: 'Product not found' })
      }
      writeData(file, filteredData)
      res.json({ message: 'Product Deleted Successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
app.delete('/api/mobile/:id', deleteProduct('mobile'))
app.delete('/api/electronics/:id', deleteProduct('electronics'))
app.delete('/api/furnitures/:id', deleteProduct('furnitures'))
app.delete('/api/cloths/:id', deleteProduct('cloths'))
app.delete('/api/toys/:id', deleteProduct('toys'))
app.post('/api/cart',(req,res)=>{
  try {
    const data = readData('Cart.json')
    const { id, email, quantity = 1, category } = req.body
    const existingItem = data.find(
      item =>
        item.id == id &&
        item.email === email &&
        item.category === category
    )
    if (existingItem) {
      existingItem.quantity += Number(quantity)
    } else {
      data.push({
        ...req.body,
        category,
        quantity: Number(quantity)
      })
    }
    writeData('Cart.json', data)
    res.status(201).json({
      message: 'Added to Cart Successfully'
    })
  } catch(error){
    res.status(500).json({ message: error.message })
  }
})
app.get('/api/cartget', (req, res) => {
  try {
    const data = readData('Cart.json')
    const { email, role } = req.query
    if (role === 'admin') {
      return res.json(data)
    }
    res.json(data.filter(item => item.email === email))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
app.put('/api/cart/:id', (req, res) => {
  try {
    const data = readData('Cart.json')
    const { email, quantity, category } = req.body
    const item = data.find(
      product =>product.id == req.params.id&&product.email === email &&
        product.category === category
    )
    if (!item) {
      return res.status(404).json({
        message: 'Cart item not found'
      })
    }
  item.quantity = Number(quantity)
  writeData('Cart.json', data)
  res.json({message: 'Cart Updated Successfully'})
  }catch(error){
    res.status(500).json({ message: error.message })
  }
})
app.delete('/api/cart/:id',(req,res)=>{
  try {
    const data = readData('Cart.json')
    const { email, category } = req.query
    const filteredData = data.filter(
      item=>!(item.id == req.params.id &&item.email === email &&
          item.category === category
        )
    )
    writeData('Cart.json', filteredData)
    res.json({message: 'Cart Item Deleted Successfully'})
  }catch(error){
    res.status(500).json({ message: error.message })
  }
})
app.post('/api/buy',(req, res)=>{
  try {
    const { email } = req.body
    const cartData = readData('Cart.json')
    const orders = readData('Orders.json')
    const userCart = cartData.filter(
      item => item.email === email
    )
    if (userCart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }
    const newOrder = {
  orderId: Date.now(),
  email,
  items: userCart,
  total: userCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
  date: new Date().toISOString(),
  status:'Pending'
}
    orders.push(newOrder)
    const remainingCart = cartData.filter(
      item => item.email !== email
    )
    writeData('Orders.json', orders)
    writeData('Cart.json', remainingCart)
    res.status(201).json({
      message: 'Order Placed Successfully',
      order: newOrder
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.use((error, req, res, next) => {
  res.status(400).json({ message: error.message })
})
app.put('/api/cart/status/:id', (req, res)=>{
  try {
    const data = readData('Cart.json')
    const { email, status } = req.body
    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      })
    }
    const item = data.find(product =>product.id == req.params.id &&
        product.email === email
    )
    if (!item) {
      return res.status(404).json({
        message: 'Cart item not found'
      })
    }
    item.status = status
    writeData('Cart.json', data)
    res.json({
      message: `Order ${status} Successfully`,
      item
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})
app.get('/api/allorders', (req, res) => {
  try {
    const data = readData('Orders.json')
    const { email, role } = req.query
    if (role==='admin') {
      return res.json(data)
    }
    const userOrders=data.filter(item => item.email===email)
    res.json(userOrders)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})
app.put('/api/allorders/:orderId', (req, res) => {
  try {
    const data = readData('Orders.json')
    const { status } = req.body
    if (!['Accepted', 'Rejected'].includes(status)){
      return res.status(400).json({
        message: 'Invalid status'
      })
    }
    const order = data.find(
      item => item.orderId == req.params.orderId
    )
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }
    order.status = status
    writeData('Orders.json', data)
    res.json({
      message: `Order ${status} Successfully`,
      order
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})
app.listen(port, () => {
  console.log('Server running Sucessfully')
})
