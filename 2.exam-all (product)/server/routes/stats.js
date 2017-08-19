const express = require('express')
const productsData = require('../data/products')
const usersData = require('../data/users')

const router = new express.Router()

router.get('/', (req, res) => {
  const products = productsData.total()
  const users = usersData.total()

  res.status(200).json({
    products,
    users
  })
})

module.exports = router
