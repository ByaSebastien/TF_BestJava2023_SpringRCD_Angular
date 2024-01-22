import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RegisterFormModel} from "../models/user/register.form.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserTokenDto} from "../models/user/user.token.dto.model";
import {LoginFormModel} from "../models/user/login.form.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  private _currentUser!: BehaviorSubject<UserTokenDto | undefined>;

  constructor(
    private readonly _http: HttpClient
  ) {
    let potentialUser = localStorage.getItem('currentUser');
    this._currentUser = new BehaviorSubject<UserTokenDto | undefined>(potentialUser ? JSON.parse(potentialUser) : undefined);
  }

  get currentUser(): UserTokenDto |undefined{
    return this._currentUser.value;
  }

  get currentUser$(): Observable<UserTokenDto|undefined>{
    return this._currentUser.asObservable();
  }

  register(form: RegisterFormModel): Observable<UserTokenDto> {
    return this._http.post<UserTokenDto>(this.apiUrl + "/register", form).pipe(tap(
      (data) => {
        this._currentUser.next(data);
        localStorage.setItem('currentUser',JSON.stringify(data));
      }
    ));
  }

  login(form: LoginFormModel): Observable<UserTokenDto> {
    return this._http.post<UserTokenDto>(this.apiUrl + "/login", form).pipe(tap(
      (data) => {
        this._currentUser.next(data);
        localStorage.setItem('currentUser',JSON.stringify(data));
      }
    ));
  }

  logout():void{
    this._currentUser.next(undefined);
    localStorage.removeItem('currentUser');
  }
}
