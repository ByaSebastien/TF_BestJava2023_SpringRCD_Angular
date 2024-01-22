import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterForm} from "./forms/register.form";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.registerForm = this._fb.group({...RegisterForm});
  }

  onSubmit(): void{

    this.registerForm.markAllAsTouched();
    if(!this.registerForm.valid){
      return;
    }
    this._authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
