import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModules } from './home-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModules, MaterialModule],
})
export class HomeModule {}
