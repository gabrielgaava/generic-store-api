import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async index() {
    return User.all()
  }

  public async create(ctx: HttpContextContract) {
    const user = ctx.request.body()
    return await User.create(user)
  }

  public async find(ctx: HttpContextContract) {
    const { id } = ctx.request.params()
    return await User.find(id)
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.request.params()
    const user = await User.findOrFail(id)
    const userData = ctx.request.body()

    const updatedUser = await user.merge(userData).save()

    return updatedUser
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.findBy('email', email)

    if (user && (await Hash.verify(user.password, password))) {
      await Database.from('api_tokens').where('user_id', user.id).delete()
      return await auth.use('api').generate(user)
    }

    return response.badRequest({
      message: 'Invalid Credential',
      code: 'INVALID_CREDENTIALS',
    })
  }

  public async me({ auth }: HttpContextContract) {
    return auth.user
  }
}
