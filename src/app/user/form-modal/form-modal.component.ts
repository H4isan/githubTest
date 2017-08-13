import { Component, OnInit, Inject } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<FormModalComponent>,
    public dialog: MdDialog,
    @Inject(MD_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    Cookie.set('githubUsers', this.newUser(f.value));
     this.dialog.closeAll();
  }
  newUser(userData) {
    let githubUsers = Cookie.get('githubUsers') ? JSON.parse(Cookie.get('githubUsers')) : [];
    if (githubUsers) {
      githubUsers.push(userData);
    } else {
      githubUsers = userData;
    }
    return JSON.stringify(githubUsers);
  }
  getCookieUser(): any[] {
    return Cookie.get('githubUsers') ? JSON.parse(Cookie.get('githubUsers')) : [];
  }
}
