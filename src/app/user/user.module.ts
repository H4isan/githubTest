import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { TableUserComponent } from './table-user/table-user.component';
import { UserServiceService } from './shared/user-service.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdSortModule, MdInputModule, MdDialogModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MdSortModule,
    SharedModule,
    NgxPaginationModule,
    MdInputModule,
    MdDialogModule
  ],
  declarations: [UserComponent, FormModalComponent, TableUserComponent],
  exports: [UserComponent],
  providers: [UserServiceService],
  entryComponents: [FormModalComponent]

})
export class UserModule { }
