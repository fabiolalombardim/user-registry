import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app.state.model';

export interface Filters {
  cityFilter: string;
  companyFilter: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  citiesFilters: any
  companyFilters: any
  filters: Filters = {
    cityFilter: "",
    companyFilter: ""
  }
  @Output() sendFilters = new EventEmitter<Filters>();

  constructor(private store: Store<AppState>) {}

  async ngOnInit(): Promise<void> {
    await this.store.select('dataState').forEach(values => {
      this.citiesFilters = Array.from(values.cityFilter)
      this.companyFilters = Array.from(values.companyNameFilter)
    })
  }

  updateFilterParams = (index: number, value: string) => {
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

  submitFilters = () => {
    this.sendFilters.emit(this.filters)
  }

}
