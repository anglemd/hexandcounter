import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent {
  public userName$: Observable<string>;

  constructor(private authService: AuthService) {
    this.userName$ = authService.userNameSubject$;
  }

  logout() {
    this.authService.logout();
  }
}
