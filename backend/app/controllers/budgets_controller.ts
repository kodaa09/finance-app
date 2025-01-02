import Budget from '#models/budget'
import type { HttpContext } from '@adonisjs/core/http'

export default class BudgetsController {
  async store({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const data = request.only(['name', 'amount', 'description'])
    const budget = await Budget.create(data)

    await budget.related('users').attach([user.id])
    return response.status(201).json({ message: 'Budget created and associated with user', budget })
  }

  async update({ params, request, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const budget = await Budget.findOrFail(params.id)
    const isOwner = await budget.related('users').query().where('id', user.id).first()

    if (!isOwner) {
      return response.unauthorized({ message: "You don't have permission to delete this budget" })
    }

    const data = request.only(['name', 'amount', 'description'])
    await budget.merge(data).save()
    await budget.related('users').attach([user.id])
    return response.status(200).json({ message: 'Budget updated successfully', budget })
  }

  async destroy({ params, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const budget = await Budget.findOrFail(params.id)
    const isOwner = await budget.related('users').query().where('id', user.id).first()

    if (!isOwner) {
      return response.unauthorized({ message: "You don't have permission to delete this budget" })
    }

    await budget.related('users').detach()
    await budget.delete()

    return response.status(200).json({ message: 'Budget deleted successfully' })
  }
}
