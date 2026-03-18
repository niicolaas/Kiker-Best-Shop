/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import CreateProductController from '#controllers/product/create_product_controller'
import AddCartItemController from '#controllers/cart_item/add_cart_item_controller'

// Lazy loading (Better Performance)
const AIController = () => import('#controllers/AIController')

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('createProduct', [CreateProductController, 'create'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.post('addproductcart', [AddCartItemController, 'create'])
  })
  .use(middleware.auth())

router.group(() => {
  router.post('/chat', [AIController, 'chat'])
})

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
