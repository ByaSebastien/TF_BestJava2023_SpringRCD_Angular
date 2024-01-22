import {Validators} from "@angular/forms";

export const RegisterForm = {
  firstname: [null,[Validators.required,Validators.maxLength(50)]],
  lastname: [null,[Validators.required,Validators.maxLength(50)]],
  email: [null,[Validators.required,Validators.maxLength(150),Validators.email]],
  password: [null,[Validators.required]],
  gender: [null,[Validators.required]]
}
