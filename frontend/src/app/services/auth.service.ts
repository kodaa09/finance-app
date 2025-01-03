import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment.js'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(credentials: { email: string; password: string }) {
    return await fetch(`${environment.api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    // return await res.json()
  }

  async signup(user: { fullName: string; email: string; password: string; currency: string; salary: number }) {
    return await fetch(`${environment.api}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    // return await res.json()
  }
}
