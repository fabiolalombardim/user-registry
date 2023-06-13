import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '../utils/header/header.component';
import { ToolbarComponent } from '../utils/toolbar/toolbar.component';
import { DialogHandlerComponent } from '../utils/dialog-handler/dialog-handler.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { testUser } from '../user-delete/user-delete.component.spec';
import { SearchbarComponent } from '../utils/searchbar/searchbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardService } from 'src/app/services/dashboard.service';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<{ users: any[], cityFilter: any[], companyNameFilter: any[] }>;
  let dashboardService: any;

  const dialogMock = {
    close: () => { }
  };

  const initialState = {
    'dataState': {
      users: [
        {
          "id": "1",
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": "2",
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
              "lat": "-43.9509",
              "lng": "-34.4618"
            }
          },
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        }
      ],
      cityFilter: [],
      companyNameFilter: []
    }
  }

  beforeEach(() => {
    let httpClient;

    dashboardService = jasmine.createSpyObj(['loadUsers']);
    dashboardService.loadUsers.and.returnValue(of(initialState.dataState.users))
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeaderComponent,
        ToolbarComponent,
        DialogHandlerComponent,
        SearchbarComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule],
      providers: [
        [ { provide: DashboardService, useValue: dashboardService } ],
        ConfigService,
        provideMockStore({ initialState }),
        {
          provide: MAT_DIALOG_DATA,
          useValue: { user: testUser }
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    httpClient = TestBed.get(HttpClientTestingModule);
    dashboardService = TestBed.get(DashboardService);
    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    spyOn(component, 'setCityFilter');
    component.loadUsers()
    expect(component.setCityFilter).toHaveBeenCalled()
  });

  it('should apply city filters', () => {
    const filters = {
      cityFilter: "Wisokyburgh",
      companyFilter: "",
      searchText: ""
    }
    component.applyFilters(filters)
  });

  it('should apply company filters', () => {
    const filters = {
      cityFilter: "",
      companyFilter: "Romaguera-Crona",
      searchText: ""
    }
    component.applyFilters(filters)
  });

  it('should apply search bar filters', () => {
    const filters = {
      cityFilter: "",
      companyFilter: "",
      searchText: "Rom"
    }
    component.applyFilters(filters)
  });

  it('should apply filters & return original data', () => {
    const filters = {
      cityFilter: "",
      companyFilter: "",
      searchText: ""
    }
    component.applyFilters(filters)
    expect(component.dataSource.data).toEqual(initialState.dataState.users)
  });
});
