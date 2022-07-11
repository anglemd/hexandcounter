import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // === DEFINE TWO INPUT CONTROLS...
  emailCtrl = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.email],
  });
  passCtrl = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.minLength(4)],
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.emailCtrl.setValue('');
    this.passCtrl.setValue('');
  }

  login() {
    this.authService
      .login(this.emailCtrl.value || '', this.passCtrl.value || '')
      .subscribe((res) => {
        // console.log(res);
      });
  }
}
