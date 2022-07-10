import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public async index() {
    return User.all()
  }

  public async create(ctx: HttpContextContract) {
    const authUser = ctx.auth.user
    const user = ctx.request.body()

    if (authUser && authUser.isAdmin) {
      // Allow create any kind of user
      return await User.create(user)
    } else {
      // Can only create regular users (acconts)
      user.isAdmin = false
      return await User.create(user)
    }
  }

  public async find(ctx: HttpContextContract) {
    await ctx.bouncer.authorize('isAdmin')
    const { id } = ctx.request.params()
    return await User.find(id)
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const { id } = request.params()

    // Verify if the auth user is edditing its own data
    await bouncer.authorize('isMySelf', id)

    const user = await User.findOrFail(id)
    const userData = request.body()
    return await user.merge(userData).save()
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.findBy('email', email)

    if (user && (await Hash.verify(user.password, password))) {
      await Database.from('api_tokens').where('user_id', user.id).delete()
      return await auth.use('api').generate(user, {
        expiresIn: '1days',
      })
    }

    return response.badRequest({
      message: 'Invalid Credential',
      code: 'INVALID_CREDENTIALS',
    })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true,
    }
  }

  public async me({ auth }: HttpContextContract) {
    return auth.user
  }
}
