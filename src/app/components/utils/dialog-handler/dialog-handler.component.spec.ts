import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHandlerComponent } from './dialog-handler.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('DialogHandlerComponent', () => {
  let component: DialogHandlerComponent;
  let fixture: ComponentFixture<DialogHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHandlerComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ]

    });
    fixture = TestBed.createComponent(DialogHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog', () => {
    component.openDialog()
  });

  it('should openDialog', () => {
    component.openDeleteDialog()
  });
});
