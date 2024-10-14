import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { Base64SrcDirective } from './directives/base64-src.directive';
@NgModule({
  declarations: [NavbarComponent, Base64SrcDirective],
  imports: [CommonModule, MaterialModule],
  exports: [NavbarComponent, Base64SrcDirective, MaterialModule],
})
export class SharedModule {}
