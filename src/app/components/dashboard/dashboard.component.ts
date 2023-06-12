import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AppState } from 'src/app/models/app.state.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UpdateCityFilters, UpdateCompanyNameFilter, UpdateUserAction } from 'src/app/store/actions/users.action';
import { DataState } from 'src/app/store/reducers/users.reducer';
import { Filters } from '../utils/toolbar/toolbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  registry$: Observable<DataState> | undefined;

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource!: MatTableDataSource<any>

  dataSourceImmutable!: MatTableDataSource<any>

  constructor(private readonly dashboardService: DashboardService, private store: Store<AppState>) {
    this.registry$ = this.store.select('dataState')
  }

  ngOnInit(): void {
    this.registry$?.subscribe((data: DataState) => {
      this.dataSource = new MatTableDataSource(data.users)
      this.dataSourceImmutable = new MatTableDataSource(data.users)
    })
    this.loadUsers()
  }

  loadUsers(): void {
    this.dashboardService.loadUsers()
      .subscribe((data: User[]) => {
        this.store.dispatch(new UpdateUserAction(data)
        )
        this.setCompanyFilter(data);
        this.setCityFilter(data)
      })
  };

  setCompanyFilter = (data: User[]): void => {
    let companies: string[] = []
    data.map(item => companies.push(item.company.name))
    this.store.dispatch(new UpdateCompanyNameFilter(new Set(companies))
    )
  }

  setCityFilter = (data: User[]): void => {
    let cities: string[] = []
    data.map(item => cities.push(item.address.city))
    this.store.dispatch(new UpdateCityFilters(new Set(cities))
    )
  }

  applyFilters = (filters: Filters): void => {
    const copyData = this.dataSourceImmutable.data.slice()

    if (filters.cityFilter !== "") {
      this.dataSource.data = copyData.filter((item: User) => item.address.city === filters.cityFilter)
    }
    if (filters.companyFilter !== "") {
      this.dataSource.data = this.dataSource.data.filter((item: User) => item.company.name === filters.companyFilter)
    }

    this.dataSource.data = this.filterByAnyField(this.dataSource.data, filters.searchText)

    if (!filters.companyFilter && !filters.cityFilter && !filters.searchText) {
      this.dataSource.data = copyData
    }
  }

  filterByAnyField = (data: User[], searchText: string): User[] => {
    return data.filter(item => (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.username.toLowerCase().includes(searchText.toLowerCase()) ||
      item.company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.website.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    ))
  }


}

