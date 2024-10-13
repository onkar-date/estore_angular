import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES_LIST = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule,
  MatInputModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...MATERIAL_MODULES_LIST],
  exports: [...MATERIAL_MODULES_LIST],
})
export class MaterialModule {}
