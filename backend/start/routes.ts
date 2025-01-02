import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const BudgetsController = () => import('#controllers/budgets_controller')
const SharedBudgetsController = () => import('#controllers/shared_budgets_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/signup', [AuthController, 'signup'])
    router.get('/check', [AuthController, 'check'])
    router.get('/me', [AuthController, 'me'])

    router.get('/budgets', [SharedBudgetsController, 'getBudgetsByUser']).use(middleware.auth())
    router.post('/budgets', [BudgetsController, 'store']).use(middleware.auth())
    router.patch('/budgets/:id', [BudgetsController, 'update']).use(middleware.auth())
    router.delete('/budgets/:id', [BudgetsController, 'destroy']).use(middleware.auth())

    router
      .post('/shared-budget', [SharedBudgetsController, 'attachUserToBudget'])
      .use(middleware.auth())
    router
      .post('/shared-budget', [SharedBudgetsController, 'detachUserFromBudget'])
      .use(middleware.auth())
    router
      .delete('unshared-budget', [SharedBudgetsController, 'detachUserFromBudget'])
      .use(middleware.auth())
  })
  .prefix('api')
