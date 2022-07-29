import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../auth.service';
import { PasswordValidator } from '../validators/password-validator';
import { EmailValidator } from '../validators/email-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  photo: null | File = null;

  constructor(
    private authService: AuthService,
    private validatePassword: PasswordValidator,
    private validateEmail: EmailValidator,
    private domSanitizer: DomSanitizer
  ) {}

  registerForm = new FormGroup(
    {
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.validateEmail.validate],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{5,}$/
          ),
        ],
      }),
      passwordConfirm: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{5,}$/
          ),
        ],
      }),
    },
    {
      validators: [this.validatePassword.validate],
    }
  );

  ngOnInit(): void {}

  get name() {
    return this.registerForm.controls.name;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get passwordConfirm() {
    return this.registerForm.controls.passwordConfirm;
  }

  async handleFileChange(e: any) {
    this.photo = (e.target as HTMLInputElement).files[0];
  }

  getPhotoUrl() {
    return this.photo
      ? this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.photo)
        )
      : '/assets/user.png';
  }

  async register(user: any) {
    this.authService.register(user).subscribe({
      next: () => {
        this.registerForm.reset();
        this.photo = null;
        this.loading = false;
      },
      error: () => {
        this.photo = null;
        this.loading = false;
      },
    });
  }

  async handleSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    const user: any = this.registerForm.value;
    if (this.photo) {
      const data = new FormData();
      data.append('image', this.photo);
      this.authService.upload(data).subscribe(({ image }) => {
        user.photo = image;
        return this.register(user);
      });
    } else {
      return this.register(user);
    }
  }
}
