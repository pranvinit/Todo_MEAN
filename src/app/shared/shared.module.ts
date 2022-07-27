import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FormInputComponent } from './form-input/form-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AlertComponent,
    FormInputComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    FooterComponent,
    FormInputComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
