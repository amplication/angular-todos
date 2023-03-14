import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @Output() setUser = new EventEmitter<string>();
  authForm = this.fb.group({
    username: '',
    password: '',
    confirm: '',
  });
  isLogin = true;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  onSubmit() {
    const { username, password, confirm } = this.authForm.getRawValue() as {
      [key: string]: string;
    };

    if (!username || !password) return;

    let authResult;

    if (!this.isLogin && password !== confirm) {
      return alert('Passwords do not match');
    } else if (!this.isLogin) {
      authResult = this.auth.signup(username.toLowerCase(), password);
    } else {
      authResult = this.auth.login(username.toLowerCase(), password);
    }

    authResult.subscribe({ next: (result: any) => this.setUser.emit(result) });
  }
}
