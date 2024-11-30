import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { Base64SrcDirective } from './directives/base64-src.directive';
import { PaiseToRupeePipe } from './pipes/paise-to-rupee.pipe';
import { FetchPrimaryImagePipe } from './pipes/fetch-primary-image.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    NavbarComponent,
    Base64SrcDirective,
    PaiseToRupeePipe,
    FetchPrimaryImagePipe,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  providers: [CurrencyPipe],
  exports: [
    NavbarComponent,
    Base64SrcDirective,
    MaterialModule,
    PaiseToRupeePipe,
    FetchPrimaryImagePipe,
  ],
})
export class SharedModule {}
