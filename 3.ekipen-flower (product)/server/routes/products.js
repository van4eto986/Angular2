const express = require('express')
const authCheck = require('../middleware/auth-check')
const productsData = require('../data/products')

const router = new express.Router()

function validateproductForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseInt(payload.price)
  

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Name must be more than 3 symbols.'
  }

  if (!payload || typeof payload.category !== 'string' || payload.category.length < 6) {
    isFormValid = false
    errors.category = 'Category must be more than 6 symbols.'
  }

  //if (!payload || typeof payload.blossom !== 'string' || payload.blossom.length < 6) {
  //  isFormValid = false
  //  errors.category = 'Blossom must be more than 6 symbols.'
  //}

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const product = req.body
  product.createdBy = req.user.email

  const validationResult = validateproductForm(product)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  productsData.save(product)

  res.status(200).json({
    success: true,
    message: 'product added successfuly.',
    product
  })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  const products = productsData.all(page, search)

  res.status(200).json(products)
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'product does not exists!'
    })
  }

  let response = {
    id,
    name: product.name,
    category: product.category,
    blossom: product.blossom,
    price: product.price,
    image: product.image,
    createdOn: product.createdOn,
    likes: product.likes.length
  }  

  res.status(200).json(response)
})

router.post('/details/:id/reviews/create', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.name

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'product does not exists!'
    })
  }

  let rating = req.body.rating
  const comment = req.body.comment

  if (rating) {
    rating = parseInt(rating)
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(200).json({
      success: false,
      message: 'Rating must be between 1 and 5.'
    })
  }

  productsData.addReview(id, rating, comment, user)

  res.status(200).json({
    success: true,
    message: 'Review added successfuly.',
    review: {
      id,
      rating,
      comment,
      user
    }
  })
})

router.post('/details/:id/like', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.email

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'product does not exists!'
    })
  }

  const result = productsData.like(id, user)

  if (!result) {
    return res.status(200).json({
      success: false,
      message: 'This user has already liked this product!'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for your like!'
  })
})

router.get('/details/:id/reviews', authCheck, (req, res) => {
  const id = req.params.id

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'product does not exists!'
    })
  }

  const response = productsData.allReviews(id)

  res.status(200).json(response)
})

router.get('/mine', authCheck, (req, res) => {
  const user = req.user.email

  const products = productsData.byUser(user)

  res.status(200).json(products)
})

router.post('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.email

  const product = productsData.findById(id)

  if (!product || product.createdBy !== user) {
    return res.status(200).json({
      success: false,
      message: 'product does not exists!'
    })
  }

  productsData.delete(id)

  return res.status(200).json({
    success: true,
    message: 'product deleted successfully!'
  })
})

module.exports = router
