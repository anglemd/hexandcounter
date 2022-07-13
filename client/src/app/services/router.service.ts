import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  public navigateToLogin() {
    this.router.navigate(['login']);
  }

  public navigateToMain() {
    this.router.navigate(['main']);
  }

  public navigateToList() {
    this.router.navigate(['game-list']);
  }
}
