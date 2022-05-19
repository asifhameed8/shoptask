import { astraClient } from "../config/db.js"
import { getObjectDiff } from "../utils/helpers.js"

const collection = astraClient.namespace("datatask").collection("products")

const createProduct = async(req, res) => {
  try {
    const {name, description, price } = req.body
    const newProduct = await collection.create({
      name: name,
      price: price,
      description: description,
      isPublish: false,
      changeRequest: '',
      productChanges: '',
    })
    // return a success msg with the new doc 
    return res.status(200).json({ newProduct, msg: 'Product created successfully', status: true })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error', status: false })
  }
}

const getProducts = async(req, res) => {
  try {
    const products = await collection.find({})
    return res.status(200).json({ products, status: true })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error', status: false })
  }
}

const updateProduct = async (req, res) => {
  try {
    await collection.update(`${req.body.id}`, {
      ...req.body
    });
    return res.status(200).json({ status: true, msg: 'Status Update', })
  } catch (error) {
    return res.status(500).json({ msg: error, status: false })
  }
}

const updateWithActivity = async (req, res) => {
  const oldData = {...req.body.oldData}
  const newData = {...req.body.newData}
  delete newData.isPublish
  const diff = getObjectDiff(oldData, newData)

  try {
    await collection.update(`${newData.id}`, {
      ...req.body.newData, productChanges: diff
    });
    return res.status(200).json({ status: true, msg: 'Status Update', })
  } catch (error) {
    return res.status(500).json({ msg: error, status: false })
  }
}

export { createProduct, getProducts, updateProduct, updateWithActivity }