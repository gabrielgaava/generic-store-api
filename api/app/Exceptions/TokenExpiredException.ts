import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new TokenExpiredException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class TokenExpiredException extends Exception {
  constructor() {
    super('The provied token is expired', 401, 'E_UNAUTHORIZED_ACCESS')
  }
}
