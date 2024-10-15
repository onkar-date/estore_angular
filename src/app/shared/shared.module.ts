import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { Base64SrcDirective } from './directives/base64-src.directive';
import { PaiseToRupeePipe } from './pipes/paise-to-rupee.pipe';
@NgModule({
  declarations: [NavbarComponent, Base64SrcDirective, PaiseToRupeePipe],
  imports: [CommonModule, MaterialModule],
  providers: [CurrencyPipe],
  exports: [
    NavbarComponent,
    Base64SrcDirective,
    MaterialModule,
    PaiseToRupeePipe,
  ],
})
export class SharedModule {}
