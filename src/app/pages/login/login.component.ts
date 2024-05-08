import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private ks: KeycloakService,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.ks.init();
    await this.ks.login();
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res:any) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
