import Route from '@ioc:Adonis/Core/Route'

const RESOURCE_PATH = 'users'

// User Routes:

// > List all database users
Route.get(`${RESOURCE_PATH}/`, 'UsersController.index')
