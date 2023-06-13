import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app.state.model';
import { SearchbarComponent } from '../searchbar/searchbar.component';

// This component is based on scalability as well. It has all the components that can be used for filtering the table's data.
// By using @ViewChild, values from the search bar and selects are gotten that then are send to the DashboardComponent, so that the list of users can be filtered.

export interface Filters {
  cityFilter: string;
  companyFilter: string;
  searchText: string;
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  citiesFilters!: Array<string>
  companyFilters!: Array<string>
  filters: Filters = {
    cityFilter: "",
    companyFilter: "",
    searchText: ""
  }

  @Output() sendFilters = new EventEmitter<Filters>();
  @ViewChild('matRefCity')
  matRefCity!: MatSelect;

  @ViewChild('matRefCompany')
  matRefCompany!: MatSelect;

  @ViewChild('searchbar')
  searchbar!: SearchbarComponent;

  constructor(private store: Store<AppState>) { }

  async ngOnInit(): Promise<void> {
    await this.store.select('dataState').forEach(values => {
      this.citiesFilters = Array.from(values.cityFilter)
      this.companyFilters = Array.from(values.companyNameFilter)
    })
  }

  // This method is used to removed a badge. According to the index it receives, the variable "filters" gets
  // cleared. If it received a zero, it clears filters.cityFilters, if it's a 1, filters.companyFilter.
  remove(index: number): void {
    switch (index) {
      case 0:
        this.filters.cityFilter = ""
        this.clearCityFilter();
        break;
      case 1:
        this.filters.companyFilter = "";
        this.clearCompanyFilter();
        break;
      default:
        return;
    }
  }

  // This method is used to update the value of the filters. According to the index it receives, the variable "filters" gets
  // updated with the new value. If it received a zero, it clears filters.cityFilters, if it's a 1, filters.companyFilter.
  updateFilterParams = (index: number, value: string): void => {
    switch (index) {
      case 0:
        this.filters.cityFilter = value
        break;
      case 1:
        this.filters.companyFilter = value;
        break;
      default:
        return;
    }
  }

  // Method that removes the selected option from the "clearCityFilter" dropdown
  clearCityFilter = (): void => {
    this.matRefCity.options.forEach((data: MatOption) => data.deselect());
  }

  // Method that removes the selected option from the "clearCompanyFilter" dropdown
  clearCompanyFilter = (): void => {
    this.matRefCompany.options.forEach((data: MatOption) => data.deselect());
  }


  // Method that sends all filters to the DashboardComponent by the use of an EventEmitter
  submitFilters = (): void => {
    this.filters.searchText = this.searchbar.search;
    this.sendFilters.emit(this.filters)
  }

}
