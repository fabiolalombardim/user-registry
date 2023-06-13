import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../../user-dialog/user-details.component';
import { User } from 'src/app/models/User.model';
import { UserDeleteComponent } from '../../user-delete/user-delete.component';

// This component is responsible for opening the corresponding dialog according to the parameters it receives
@Component({
  selector: 'app-dialog-handler',
  templateUrl: './dialog-handler.component.html',
  styleUrls: ['./dialog-handler.component.scss']
})
export class DialogHandlerComponent {
  // Variable used for storing the specific user(type User) that will be display. Will open UserDeleteComponent if true
  @Input() userData!: User
  // Variable that handles the logic to know if the modal is for an update or for creating a new user. Will open UserDeleteComponent if true
  @Input() isNew = false;
  // Variable to know which component the dialog such render. Will open UserDeleteComponent if true
  @Input() isDelete = false;

  constructor(public dialog: MatDialog) { }

  openDialog = (): void => {
    this.dialog.open(UserDetailsComponent, {
      width: '90vw',
      height: 'fit-content',
      data: {
        user: this.userData, isNew: this.isNew
      }
    });
  }

  openDeleteDialog = () => {
    this.dialog.open(UserDeleteComponent, {
      width: '40vw',
      height: 'fit-content',
      data: {
        user: this.userData, isNew: this.isNew
      }
    });
  }
}

