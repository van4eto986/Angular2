const products = {}
let currentId = 0

module.exports = {
  total: () => Object.keys(products).length,
  save: (product) => {
    const id = ++currentId
    product.id = id

    let newProduct = {
      id,
      name: product.name,
      category: product.category,
      blossom: product.blossom,
      price: product.price,
      image: product.image,
      createdOn: new Date(),
      createdBy: product.createdBy,
      likes: [],
      reviews: []
    }    

    products[id] = newProduct
  },
  all: (page, search) => {
    const pageSize = 10

    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize

    return Object
      .keys(products)
      .map(key => products[key])
      .filter(product => {
        if (!search) {
          return true
        }

        const productName = product.name.toLowerCase()
        const productCategory = product.category.toLowerCase()
        const searchTerm = search.toLowerCase()

        return productCategory.indexOf(searchTerm) >= 0 ||
          productName.indexOf(searchTerm) >= 0
      })
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return products[id]
  },
  addReview: (id, rating, comment, user) => {
    const review = {
      rating,
      comment,
      user,
      createdOn: new Date()
    }

    products[id].reviews.push(review)
  },
  allReviews: (id) => {
    return products[id]
      .reviews
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0)
  },
  like: (id, user) => {
    const likes = products[id].likes

    if (likes.indexOf(user) >= 0) {
      return false
    }

    likes.push(user)

    return true
  },
  byUser: (user) => {
    return Object
      .keys(products)
      .map(key => products[key])
      .filter(product => product.createdBy === user)
      .sort((a, b) => b.id - a.id)
  },
  delete: (id) => {
    delete products[id]
  }
}
