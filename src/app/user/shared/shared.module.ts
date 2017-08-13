import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MdButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    MdButtonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class SharedModule { }
