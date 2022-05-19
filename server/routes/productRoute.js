import App from 'express'

import {
 createProduct, getProducts, updateProduct, updateWithActivity
} from '../controllers/productController.js'

const app = App.Router()

app.get('/getProducts', getProducts)
app.post('/createProduct', createProduct)
app.put('/updateProduct', updateProduct)
app.put('/updateWithActivity', updateWithActivity)

export default app
