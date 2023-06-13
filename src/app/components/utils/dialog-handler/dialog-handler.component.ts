import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../../user-dialog/user-details.component';
import { User } from 'src/app/models/User.model';
import { UserDeleteComponent } from '../../user-delete/user-delete.component';

@Component({
  selector: 'app-dialog-handler',
  templateUrl: './dialog-handler.component.html',
  styleUrls: ['./dialog-handler.component.scss']
})
export class DialogHandlerComponent {
  @Input() userData!: User
  @Input() isNew = false;
  @Input() isDelete = false;

  constructor(public dialog: MatDialog) { }

  openDialog = (): void => {
    this.dialog.open(UserDetailsComponent, {
      width: '80vw',
      height: 'fit-content', 
      data: {user: this.userData, isNew: this.isNew
      }
    });
  }

  openDeleteDialog = () => {
    this.dialog.open(UserDeleteComponent, {
      width: '40vw',
      height: 'fit-content', 
      data: {user: this.userData, isNew: this.isNew
      }
    });
  }
}

