import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
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
}
