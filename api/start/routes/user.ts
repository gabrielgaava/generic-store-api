import Route from '@ioc:Adonis/Core/Route'

const path = 'users'

/*
|--------------------------------------------------------------------------
| USERS Routes                              By: Gabriel Gava  (24/03/2022)
|--------------------------------------------------------------------------
*/

/*  Public Routes */
/**/ Route.post(`${path}/`, 'UsersController.create')
/**/ Route.post(`${path}/auth`, 'UsersController.login')

/* Protected Routes */
Route.group(() => {
  Route.get('/me', 'UsersController.me')
  Route.post('/logout', 'UsersController.logout')
  Route.put(`${path}/:id`, 'UsersController.update')

  /* Admin Only */
  /**/ Route.get(`${path}/`, 'UsersController.index')
  /**/ Route.get(`${path}/:id`, 'UsersController.find')
}).middleware('auth')
