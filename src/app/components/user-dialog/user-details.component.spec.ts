import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { testUser } from '../user-delete/user-delete.component.spec';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: MockStore<{ users: any[], cityFilter: any[], companyNameFilter: any[] }>;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(() => {
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

    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        FormsModule,
        MatSnackBarModule, 
        MatIconModule, 
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, MatCardModule, MatDividerModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { user: testUser }
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
        provideMockStore({ initialState })
      ]
    });
    
    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable edit', () => {
    component.enableEdit()
    expect(component.editEnabled).toBeTruthy()
  });

  it('should disable edit', () => {
    component.editEnabled = true
    component.enableEdit()
    expect(component.editEnabled).toBeFalsy()
  });

  it('should call onsubmit if new', () => {
    component.data.isNew = true
    spyOn(component, 'saveUser');
    component.onSubmit()
    expect(component.saveUser).toHaveBeenCalled()
  });

  it('should call onsubmit if update', () => {
    component.data.isNew = false
    spyOn(component, 'updateUsersList');
    component.onSubmit()
    expect(component.updateUsersList).toHaveBeenCalled()
  });

  it('should save user', () => {
    component.saveUser()
  });

  it('should update user list', () => {
    component.updateUsersList()
  });

  it('should update user list', () => {
    component.shouldDisable()
  });
});
