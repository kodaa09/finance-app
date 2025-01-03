import { Component, inject, output, signal } from '@angular/core'
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service.js'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ButtonModule } from 'primeng/button'
import { PasswordModule } from 'primeng/password'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  imports: [CardModule, InputTextModule, FloatLabelModule, ButtonModule, ReactiveFormsModule, PasswordModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private _authService = inject(AuthService)
  private _router = inject(Router)
  changeForm = output<boolean>()
  isLoading = signal(false)
  errorMessage = signal('')

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  async onLogin() {
    this.isLoading.set(true)
    const credentials = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    }
    try {
      const res = await this._authService.login(credentials)
      if (res.status === 200) {
        this._router.navigate(['/overview'])
      } else {
        const error = await res.json()
        this.errorMessage.set(error.errors[0].message)
      }
    } catch (error) {
      console.log(error)
    }
    this.isLoading.set(false)
  }

  onChangeForm() {
    this.loginForm.reset()
    this.changeForm.emit(true)
    this.errorMessage.set('')
  }
}
