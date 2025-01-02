import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) return response.status(401).json({ message: 'Unauthorized' })

    const transactions = await Transaction.query()
      .where('userId', user.id)
      .orderBy('date')
      .preload('budget')
    return response.status(200).json({ transactions })
  }

  async store({ request, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) return response.status(401).json({ message: 'Unauthorized' })

    const { name, amount, type, isReccurent, date, budgetId } = request.only([
      'name',
      'amount',
      'type',
      'isReccurent',
      'date',
      'budgetId',
    ])

    const transaction = await Transaction.create({
      name,
      amount,
      type,
      isReccurent,
      date,
      budgetId,
      userId: user.id,
    })
    return response.status(201).json({ transaction })
  }

  async show({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) return response.status(401).json({ message: 'Unauthorized' })

    const transaction = await Transaction.query()
      .where('userId', user.id)
      .where('id', params.id)
      .first()
    if (!transaction) return response.status(404).json({ message: 'Transaction not found' })

    return response.status(200).json({ transaction })
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) return response.status(401).json({ message: 'Unauthorized' })

    const transaction = await Transaction.query()
      .where('userId', user.id)
      .where('id', params.id)
      .first()
    if (!transaction) return response.status(404).json({ message: 'Transaction not found' })

    const { name, amount, type, isReccurent, date, budgetId } = request.only([
      'name',
      'amount',
      'type',
      'isReccurent',
      'date',
      'budgetId',
    ])

    await transaction
      .merge({
        name,
        amount,
        type,
        isReccurent,
        date,
        budgetId,
      })
      .save()
    return response.status(200).json({ transaction })
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    if (!user) return response.status(401).json({ message: 'Unauthorized' })

    const transaction = await Transaction.query()
      .where('userId', user.id)
      .where('id', params.id)
      .first()
    if (!transaction) return response.status(404).json({ message: 'Transaction not found' })

    await transaction.delete()
    return response.status(204).json({ message: 'Transaction deleted' })
  }
}
