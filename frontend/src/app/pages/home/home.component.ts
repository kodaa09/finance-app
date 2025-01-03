import { Component, signal } from '@angular/core'
import { LoginFormComponent } from '../../components/auth-form/login-form.component'
import { SignupFormComponent } from '../../components/signup-form/signup-form.component'

@Component({
  selector: 'app-home',
  imports: [LoginFormComponent, SignupFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoginForm = signal(true)

  onChangeForm() {
    this.isLoginForm.update((oldValue) => !oldValue)
  }
}
