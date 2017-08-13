import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserServiceService {

  private github = 'https://raw.githubusercontent.com/H4isan/custom_libs/master/TeamChallenges.json';
  private githubReposlanguage = 'https://api.github.com/repos/h4isan/YuxiTest/languages';
  constructor(private _http: Http) { }

  getUserRepos(user): Observable<any[]> {
    return this._http.get('http://api.github.com/users/' + user + '/repos')
      .map((res: Response) => res.json());
  }
  getcookieUser(): Observable<any[]> {
    const cookieUser = Cookie.get('githubUsers');
    return Observable.create((observer) => {
      setTimeout(() => {
        observer.next((JSON.parse(cookieUser)));
        observer.complete();
      });
    });

  }
}
