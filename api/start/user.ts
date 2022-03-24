import Route from '@ioc:Adonis/Core/Route'

const path = 'users'

// User Routes:

// > List all database users
Route.get(`${path}/`, 'UsersController.index')
Route.get(`${path}/:id`, 'UsersController.find')
Route.post(`${path}/`, 'UsersController.create')
Route.put(`${path}/:id`, 'UsersController.update')
