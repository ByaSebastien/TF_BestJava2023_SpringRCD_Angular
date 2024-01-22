import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoginForm} from "./forms/login.form";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  error?: string;

  constructor(
    private readonly _fb : FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.loginForm = this._fb.group({...LoginForm});
  }

  onSubmit(): void{

    this.loginForm.markAllAsTouched();

    if(!this.loginForm.valid){
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.error = "Email or password doesn't match."
      }
    })
  }
}
