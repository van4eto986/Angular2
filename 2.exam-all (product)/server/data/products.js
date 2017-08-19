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
      age: product.age,
      color: product.color,
      type: product.type,
      price: product.price,
      image: product.image,
      createdOn: new Date(),
      createdBy: product.createdBy,
      reactions: {
        like: [],
        love: [],
        haha: [],
        wow: [],
        sad: [],
        angry: []
      },
      comments: []
    }

    if (product.breed) {
      newProduct.breed = product.breed
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
        const productType = product.type.toLowerCase()
        const searchTerm = search.toLowerCase()

        return productName.indexOf(searchTerm) >= 0 ||
          productType.indexOf(searchTerm) >= 0
      })
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return products[id]
  },
  addComment: (id, message, user) => {
    const comment = {
      message,
      user,
      createdOn: new Date()
    }

    products[id].comments.push(comment)
  },
  allComments: (id) => {
    return products[id]
      .comments
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0)
  },
  reaction: (id, type, user) => {
    const reactions = products[id].reactions
    const reactionType = reactions[type];

    if (reactionType === undefined) {
      return false
    }

    if (reactionType.indexOf(user) >= 0) {
      return false
    }

    reactionType.push(user)

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
