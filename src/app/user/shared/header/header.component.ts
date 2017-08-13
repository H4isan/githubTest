import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  private _dataGithubUsers = new BehaviorSubject<any[]>([]);
  @Input()
  set githubUsers(value) {
    this._dataGithubUsers.next(value);
  }
  get githubUsers() {
    return this._dataGithubUsers.getValue();
  }
  githubUsersInfo: any[];
  constructor() { }
  ngOnInit() {
    this._dataGithubUsers
      .subscribe((dataChallenges: any) => {
        this.githubUsersInfo = dataChallenges;
      });
  }
  sendUser(githubUser){
     this.buttonClicked.emit(githubUser);
  }
  getLastUser(users) {
    let tempGetUser = [];
    if (users) {
      const cookieparserUser = JSON.parse(Cookie.get('githubUsers'));
      tempGetUser = cookieparserUser[Object.keys(cookieparserUser)[Object.keys(cookieparserUser).length - 1]];
    } else {
      tempGetUser = [];
      console.log('404 :D ');
    }
    return tempGetUser;
  }
}
