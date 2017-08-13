import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import { UserServiceService } from './../shared/user-service.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {

  private _dataGithubUser = new BehaviorSubject<any[]>([]);
  @Input()
  set githubUser(value) {
    this._dataGithubUser.next(value);
  }
  get githubUser() {
    return this._dataGithubUser.getValue();
  }
  @ViewChild('filter') filter: ElementRef;
  temp: any[];
  sortedData;
  githubUserRepos = [];
  p: number = 1;
  state = false;
  constructor(private userService: UserServiceService) {
  }
  ngOnInit() {
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(() => {
        const filterValue = this.filter.nativeElement.value;
        if (filterValue && filterValue.length >= 3) {
          const val = filterValue.toLowerCase();
          const temp = this.temp.filter(function (repos) {
            return repos.name.toLowerCase().indexOf(val) !== -1 || !val;
          });
          this.githubUserRepos = temp;
        } else {
          this.githubUserRepos = this.temp;
        }
      });
    this._dataGithubUser
      .subscribe((dataChallenges: any) => {
        if (dataChallenges) {
          const userRepos = this.userService.getUserRepos(dataChallenges).subscribe((response) => {
            response.map((x) => {
              this.githubUserRepos.push(x);
              this.temp = [...this.githubUserRepos];
              this.state = true; 
            });
          });
        }

      });

  }
  sortData(sort: Sort) {
    const data = this.githubUserRepos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(+a.calories, +b.calories, isAsc);
        case 'fat': return compare(+a.fat, +b.fat, isAsc);
        case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });
  }


}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}