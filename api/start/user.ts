import Route from '@ioc:Adonis/Core/Route'

const path = 'users'

/*
|--------------------------------------------------------------------------
| USERS Routes                              By: Gabriel Gava  (24/03/2022)
|--------------------------------------------------------------------------
*/

/*  Public Routes */
/**/ Route.get(`${path}/`, 'UsersController.index')
/**/ Route.post(`${path}/`, 'UsersController.create')
/**/ Route.post(`${path}/auth`, 'UsersController.login')

/* Protected Routes */
/**/ Route.get('/me', 'UsersController.me').middleware('auth')
/**/ Route.put(`${path}/:id`, 'UsersController.update').middleware('auth')

/* Admin Only */
/**/ Route.get(`${path}/:id`, 'UsersController.find').middleware('auth')
