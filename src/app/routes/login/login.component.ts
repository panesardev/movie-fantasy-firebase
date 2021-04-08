import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: LoginUser = new LoginUser();
  error: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    try {
      await this.auth.login(this.user);
    } catch (e) {
      this.error = e.message
    }
  }

  async googleLogin(): Promise<void> {
    try {
      await this.auth.googleLogin();
    } catch (e) {
      this.error = e.message
    }
  }

}
