import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AppState } from 'src/app/models/app.state.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UpdateUserAction } from 'src/app/store/actions/users.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  users$: Observable<Array<User>> | undefined;

  constructor(private readonly dashboardService: DashboardService, private store: Store<AppState>) { }

  ngOnInit() {
    this.users$ = this.store.select("users");
    this.loadUsers()
  }

  loadUsers() {
    this.dashboardService.loadUsers()
      .subscribe((data: User[]) => {
        this.store.dispatch(new UpdateUserAction(data) )
      })
  };
}

