import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const MATERIAL_MODULES_LIST = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...MATERIAL_MODULES_LIST],
  exports: [MatToolbarModule, ...MATERIAL_MODULES_LIST],
})
export class MaterialModule {}
