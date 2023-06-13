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

// Base component where the set of components that make up the app are displayed
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // Observable used to have the data of the NgRx store up to data. 
  registry$: Observable<DataState> | undefined;

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'update', 'delete'];
  dataSource!: MatTableDataSource<any>

  dataSourceImmutable!: MatTableDataSource<any>

  constructor(private readonly dashboardService: DashboardService, private store: Store<AppState>) {
    this.registry$ = this.store.select('dataState')
  }

  // For this demo, every time the page gets loaded/refreshed it will call the API and the list
  // of users will always be the same. In case there was a modification of the data before hitting the refresh button,
  // it will get lost. So for testing out the app correctly, we most be aware of this information
  ngOnInit(): void {
    this.registry$?.subscribe((data: DataState) => {
      this.dataSource = new MatTableDataSource(data.users)
      this.dataSourceImmutable = new MatTableDataSource(data.users)
    })
    this.loadUsers()
  }

  // Method that implements the loadUsers() method from the Dashboard service to recover the list of users.
  // Then, updates de storage with the received data.
  loadUsers(): void {
    this.dashboardService.loadUsers()
      .subscribe((data: User[]) => {
        this.store.dispatch(new UpdateUserAction(data)
        )
        this.setCompanyFilter(data);
        this.setCityFilter(data)
      })
  };

  // Method that filters the list of users and saves in the storage each user company name as a list of strings,
  // so that it can fill the company name dropdown
  setCompanyFilter = (data: User[]): void => {
    let companies: string[] = []
    data.map(item => companies.push(item.company.name))
    this.store.dispatch(new UpdateCompanyNameFilter(new Set(companies))
    )
  }

  // Method that filters the list of users and saves in the storage each user city as a list of strings,
  // so that it can fill the city dropdown
  setCityFilter = (data: User[]): void => {
    let cities: string[] = []
    data.map(item => cities.push(item.address.city))
    this.store.dispatch(new UpdateCityFilters(new Set(cities))
    )
  }

  // Method that sorts the list of users in accordance with the filters received when the user clicks the "Search" button
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

  // This field filters the list of users and checks if there is a coincidence between the string received
  // from the searchbar and the value of any field of the User model
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

