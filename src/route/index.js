// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = Math.floor(Math.random() * 100000)

    //   this.createDate = () => {
    //     this.date = new Date().toISOString()
    //   }
  }
  //============================================
  //статичный метод, кот. будет возвращать массив #list
  static getList = () => this.#list
  //============================================

  //============================================

  //============================================

  //============================================
  // статичный метод, кот. будет принимать уже
  // созданный товар и сохранять его в частной
  // переменной #list
  static add = (product) => {
    this.#list.push(product)
  }
  //============================================

  //============================================
  static getById = (id) =>
    this.#list.find((product) => product.id === id)
  // static updateById = (id, data) => {
  //   const product = this.getById(id)
  // }
  //============================================

  //============================================
  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  //============================================

  //============================================
  static updateById = (id, { data }) => {
    const product = this.getById(id)
    const { price } = data

    if (product) {
      if (price) {
        product.price = price

        return true
      } else {
        return false
      }
    }
  }
}
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    style: 'index',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
})

// =====================PRODUCT-CREATE===========================================
router.get('/product-create', function (req, res) {
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    style: 'product-create',
    data: {
      products: {
        list: getList(),
        isEmpty: list.length === 0,
      },
    },
  })
})

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)
  console.log(Product.getList())
  if (product) {
    res.render('alert', {
      style: 'alert',
      info: 'Успішне виконання дії',
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Товар не доданий',
    })
  }
})

// =====================PRODUCT-LIST===========================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  const list = Product.getList()
  console.log(list)
  res.render('product-list', {
    style: 'product-list',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
})
// =====================PRODUCT-EDIT===========================================
router.get('/product-edit', function (req, res) {
  const { id } = req.query

  const product = Product.getById(Number(id))

  // console.log(product)

  if (product) {
    return res.render('product-edit', {
      style: 'product-edit',

      data: {
        name: product.name,
        price: product.price,
        id: product.id,
        description: product.description,
      },
    })
  } else {
    return res.render('alert', {
      style: 'alert',
      info: 'Продукту за таким ID не знайдено',
    })
  }
})
router.post('/product-edit', function (req, res) {
  const { id, name, price } = req.body
  const product = Product.updateById(
    Number(id),
    name,
    price,
  )

  if (product) {
    res.render('alert', {
      style: 'alert',
      info: 'Інформація про товар оновлена',
    })
  } else {
    res.render('alert', {
      style: 'alert',
      info: 'Сталася помилка',
    })
  }
})
// =====================PRODUCT-Delete===========================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query
  Product.deleteById(Number(id))
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Товар успішно був видалений',
  })
})
// ↑↑ сюди вводимо JSON дані

//======================================
// router.get Створює нам один ентпоїнт

// Підключаємо роутер до бек-енду
module.exports = router
