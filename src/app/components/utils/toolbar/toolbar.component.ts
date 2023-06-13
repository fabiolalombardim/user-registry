import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app.state.model';
import { SearchbarComponent } from '../searchbar/searchbar.component';

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

  clearCityFilter = (): void => {
    this.matRefCity.options.forEach((data: MatOption) => data.deselect());
  }

  clearCompanyFilter = (): void => {
    this.matRefCompany.options.forEach((data: MatOption) => data.deselect());
  }

  submitFilters = (): void => {
    this.filters.searchText = this.searchbar.search;
    this.sendFilters.emit(this.filters)
  }

}
