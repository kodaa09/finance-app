import { Component, inject, output, signal } from '@angular/core'
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service.js'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { SelectModule } from 'primeng/select'
import { PasswordModule } from 'primeng/password'

@Component({
  selector: 'app-signup-form',
  imports: [CardModule, InputTextModule, FloatLabelModule, ButtonModule, ReactiveFormsModule, InputNumberModule, SelectModule, PasswordModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  private _authService = inject(AuthService)
  changeForm = output<boolean>()
  isLoading = signal(false)
  errorMessage = signal('')
  currencies = [
    { name: '€', code: 'EUR' },
    { name: '$', code: 'USD' },
  ]

  get currency() {
    return this.signupForm.value.currency!.code
  }

  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    currency: new FormControl({ name: '€', code: 'EUR' }, [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
  })

  onSignup() {
    const formValue = this.signupForm.value
    if (formValue.fullName && formValue.email && formValue.password && formValue.currency && formValue.salary !== null) {
      this._authService.signup({
        fullName: formValue.fullName,
        email: formValue.email,
        password: formValue.password,
        currency: formValue.currency.code,
        salary: Number(formValue.salary),
      })
    }
  }

  onChangeForm() {
    this.signupForm.reset()
    this.changeForm.emit(true)
    this.errorMessage.set('')
  }
}
