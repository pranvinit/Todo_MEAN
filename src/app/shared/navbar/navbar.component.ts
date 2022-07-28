import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  handleLogoClick() {
    window.location.replace('/home');
  }

  handleLogout() {
    this.authService.logout().subscribe(() => {});
  }

  ngOnInit(): void {}
}
