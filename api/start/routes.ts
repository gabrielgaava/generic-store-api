import Database from '@ioc:Adonis/Lucid/Database'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|

*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/user'

Route.get('/', async () => {
  const healthCheck = {
    version: '0.0.1',
    status: 'Online',
    database: 'Online',
    lastUpdate: new Date(),
  }

  return healthCheck
})
