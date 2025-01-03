import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'

export default class AuthController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  async signup({ request, response }: HttpContext) {
    const { fullName, email, password, salary, currency } = request.only([
      'fullName',
      'email',
      'password',
      'salary',
      'currency',
    ])

    const user = await User.create({
      fullName,
      email,
      password,
      salary,
      currency,
    })

    if (!user) {
      return response.status(404).json({ message: 'User already registered' })
    }

    return response.status(200).send(user)
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(AuthController.validator)

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.status(200).send(user)
  }

  async check({ auth }: HttpContext) {
    return await auth.use('web').check()
  }

  async me({ auth, response }: HttpContext) {
    try {
      const isAuthenticated = await auth.use('web').check()

      if (isAuthenticated) {
        const user = auth.use('web').user
        if (!user) return response.status(200).send({ error: 'Not authenticated' })
        return response.status(200).send(user)
      } else {
        return response.status(401).send({ error: 'Not authenticated' })
      }
    } catch (error) {
      return response.status(500).send({ error: 'Internal server error' })
    }
  }
}
