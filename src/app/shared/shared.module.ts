import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input/form-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    FormInputComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    AlertsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    FooterComponent,
    FormInputComponent,
    NavbarComponent,
    AlertsComponent,
  ],
})
export class SharedModule {}
