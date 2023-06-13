import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: MockStore<{ users: any[], cityFilter: any[], companyNameFilter: any[] }>;


  beforeEach(() => {
    const initialState = {
      'dataState': {
        users: [],
        cityFilter: [],
        companyNameFilter: []
      }
    }
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent, SearchbarComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule],
      providers: [provideMockStore({ initialState }),
      ]
    });
    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit', () => {
    component.ngOnInit()
    expect(component.citiesFilters).toEqual([])
  });

  it('should set filters to empty array', () => {
    component.ngOnInit()
    expect(component.citiesFilters).toEqual([])
  });

  it('should remove city filter', () => {
    component.filters.cityFilter = "test"
    component.remove(0)
    expect(component.filters.cityFilter).toEqual("")
  });

  it('should remove filter', () => {
    component.filters.cityFilter = "test"
    component.remove(1)
    expect(component.filters.cityFilter).toEqual("test")
  });

  it('should run inside switch default', () => {
    component.remove(3)
  });

  it('should updateFilter', () => {
    component.filters.cityFilter = "test"
    component.updateFilterParams(1, "madrid")
    expect(component.filters.cityFilter).toEqual("test")
  });

  it('should updateFilter', () => {
    component.filters.cityFilter = "test"
    component.updateFilterParams(0, "madrid")
    expect(component.filters.cityFilter).toEqual("madrid")
  });

  it('should updateFilter', () => {
    component.filters.cityFilter = "test"
    component.updateFilterParams(3, "madrid")
    expect(component.filters.cityFilter).toEqual("test")
  });

  it('should submitFilter', () => {
    spyOn(component.sendFilters, 'emit');
    component.submitFilters()
    expect(component.sendFilters.emit).toHaveBeenCalled()
  });


});


