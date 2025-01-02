import Budget from '#models/budget'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SharedBudgetsController {
  public async attachUserToBudget({ request, response }: HttpContext) {
    const { userId, budgetId } = request.only(['userId', 'budgetId'])
    const user = await User.findOrFail(userId)
    const budget = await Budget.findOrFail(budgetId)

    await budget.related('users').attach([user.id])
    return response.status(200).json({ message: 'User attached to budget successfully' })
  }

  public async detachUserFromBudget({ request, response }: HttpContext) {
    const { userId, budgetId } = request.only(['userId', 'budgetId'])
    const budget = await Budget.findOrFail(budgetId)

    await budget.related('users').detach([userId])
    return response.status(200).json({ message: 'User detached from budget successfully' })
  }

  public async getBudgetsByUser({ auth, response }: HttpContext) {
    const authUser = await auth.authenticate()
    const user = await User.findOrFail(authUser.id)
    const budgets = await user.related('budgets').query()

    return response.status(200).json(budgets)
  }
}
