import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component.js';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
  },
  {
    path: 'budgets',
    loadComponent: () =>
      import('./pages/budgets/budgets.component').then(
        (m) => m.BudgetsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
