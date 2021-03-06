/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('users', 'UsersController').apiOnly()
Route.group(() => {
  Route.resource('posts', 'PostsController').apiOnly()
  Route.resource('tags', 'TagsController').apiOnly()
  Route.get('/users/:user_id/posts', 'UserPostsController.index')
  Route.resource('posts.tags', 'PostTagsController').apiOnly()
  Route.post('/media', 'MediaController.store')
  Route.get('/media/:id', 'MediaController.show')
}).middleware('auth')
Route.post('/sessions', 'SessionsController.store')
Route.resource('testes', 'TestesController').apiOnly()
