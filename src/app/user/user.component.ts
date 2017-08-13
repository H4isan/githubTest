import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  cookieUserParser = [];
  constructor(public dialog: MdDialog) { }
  githubUserNick;
  ngOnInit() {
    this.getCookieUsers();
  }
  openDialog() {
    const dialogRef = this.dialog.open(FormModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getCookieUsers();
    });
  }

  getUserGithub(param) {
    this.githubUserNick = param;
  }

  getCookieUsers(): void {
    this.cookieUserParser = Cookie.get('githubUsers') ? JSON.parse(Cookie.get('githubUsers')) : [];
  }

}
