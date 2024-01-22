import {Component} from '@angular/core';
import {Link} from "./models/link.model";
import {UserTokenDto} from "../../core/models/user/user.token.dto.model";
import {AuthService} from "../../core/services/auth.service";
import {UserRole} from "../../core/models/user/enums/user.role.enum";

const anonymousNav: Link[] = [
  {title: "Register", url: "/register"},
  {title: "Login", url: "/login"}
];

const userNav: Link[] = [
]

const adminNav: Link[] = [
]

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nav!: Link[];
  currentUser! : UserTokenDto |undefined;

  constructor(
    private readonly _authService: AuthService
  ) {
    this._authService.currentUser$.subscribe(
      (data) => {
        this.currentUser = data;
        this.nav = this.currentUser ? (this.currentUser.user.role == UserRole.ADMIN ? adminNav : userNav) : anonymousNav;
      });
  }

  logout():void{
    this._authService.logout();
  }
}
