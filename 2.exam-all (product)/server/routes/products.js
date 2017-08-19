const express = require('express')
const authCheck = require('../middleware/auth-check')
const productsData = require('../data/products')

const router = new express.Router()

function validateProductForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.age = parseInt(payload.age)
  payload.price = parseInt(payload.price)

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Name must be more than 3 symbols.'
  }

  if (!payload || !payload.age || payload.age < 0 || payload.age > 100) {
    isFormValid = false
    errors.age = 'Age must be between 0 and 100.'
  }
  
  if (!payload || typeof payload.color !== 'string' || payload.color.length < 3) {
    isFormValid = false
    errors.color = 'Color must be more than 3 symbols.'
  }

  if (!payload || typeof payload.type !== 'string' || 
    (payload.type !== 'Cat' && payload.type !== 'Dog' && payload.type !== 'Bunny' && payload.type !== 'Exotic' && payload.type !== 'Other')) {
    isFormValid = false
    errors.type = 'Type must Cat, Dog, Bunny, Exotic or Other.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (payload && payload.breed) {
    if (!payload || typeof payload.breed !== 'string' || payload.breed.length < 3) {
      isFormValid = false
      errors.breed = 'Breed must be more than 3 symbols.'
    }
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

  const validationResult = validateProductForm(product)
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
    message: 'Product added successfuly.',
    product
  })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  const products = productsData
    .all(page, search)
    .map(a => ({
      id: a.id,
      name: a.name,
      age: a.age,
      color: a.color,
      type: a.type,
      price: a.price,
      image: a.image,
      createdOn: a.createdOn,
    }))

  res.status(200).json(products)
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  let response = {
    id,
    name: product.name,
    age: product.age,
    color: product.color,
    type: product.type,
    price: product.price,
    image: product.image,
    createdOn: product.createdOn,
    reactions: {
      like: product.reactions.like.length,
      love: product.reactions.love.length,
      haha: product.reactions.haha.length,
      wow: product.reactions.wow.length,
      sad: product.reactions.sad.length,
      angry: product.reactions.angry.length
    } 
  }

  if (product.breed) {
    response.breed = product.breed
  }

  res.status(200).json(response)
})

router.post('/details/:id/comments/create', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.name

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  const message = req.body.message

  if (!message || message.length < 10) {
    return res.status(200).json({
      success: false,
      message: 'Comment must be more than 10 symbols.'
    })
  }

  productsData.addComment(id, message, user)

  res.status(200).json({
    success: true,
    message: 'Comment added successfuly.',
    comment: {
      id,
      message,
      user
    }
  })
})

router.post('/details/:id/reaction', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.email
  const reactionType = req.body.type

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  const result = productsData.reaction(id, reactionType, user)

  if (!result) {
    return res.status(200).json({
      success: false,
      message: 'Invalid reaction!'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for your reaction!'
  })
})

router.get('/details/:id/comments', authCheck, (req, res) => {
  const id = req.params.id

  const product = productsData.findById(id)

  if (!product) {
    return res.status(200).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  const comments = productsData.allComments(id)

  res.status(200).json(comments)
})

router.get('/mine', authCheck, (req, res) => {
  const user = req.user.email

  const products = productsData
    .byUser(user)
    .map(a => ({
      id: a.id,
      name: a.name,
      age: a.age,
      color: a.color,
      type: a.type,
      price: a.price,
      image: a.image,
      createdOn: a.createdOn,
    }))

  res.status(200).json(products)
})

router.post('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.email

  const product = productsData.findById(id)

  if (!product || product.createdBy !== user) {
    return res.status(200).json({
      success: false,
      message: 'Product does not exists!'
    })
  }

  productsData.delete(id)

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully!'
  })
})

module.exports = router
