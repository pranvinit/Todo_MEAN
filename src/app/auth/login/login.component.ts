import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private authService: AuthService) {}

  signinForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  handleSubmit() {
    if (!this.signinForm.valid) return;
    this.loading = true;
    this.authService.login(this.signinForm.value as any).subscribe({
      next: () => {
        this.signinForm.reset();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  handleDemo() {
    this.signinForm.setValue({ email: 'demo@gmail.com', password: 'secret21' });
    this.handleSubmit();
  }

  get email() {
    return this.signinForm.controls.email;
  }

  get password() {
    return this.signinForm.controls.password;
  }

  ngOnInit(): void {}
}
