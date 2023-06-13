import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User.model';
import { AppState } from 'src/app/models/app.state.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UpdateUserAction } from 'src/app/store/actions/users.action';

// Component used with the sole objective of the confirmation of the deletion of a user record
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  users!: User[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User, },
    private readonly snackbarService: SnackbarService,
    private store: Store<AppState>, public dialogRef: MatDialogRef<UserDeleteComponent>
  ) { }

  // When the component loads, the list of users saved in the store it's retrieved to compare 
  // the list of users with the one received in the constructor of this component in order to delete it
  // from the list.
  ngOnInit(): void {
    this.store.select('dataState').forEach(values => {
      this.users = values.users
    })
  }

  closeDialog = () => {
    this.dialogRef.close()
  }

  // Method used to removed an user from the list of users and save the updated list in the NgRx store.
  // The user to be deleted it's found by it's index and then removed from the list of users saved in the store.
  deleteUser = () => {
    const id = this.data.user.id;
    const index = this.users.findIndex(obj => obj.id === id);
    let userList = this.users.slice();
    if (index > -1) { // only splice array when item is found
      userList.splice(index, 1); // 2nd parameter means remove one item only
      this.store.dispatch(new UpdateUserAction(userList))
      this.closeDialog()
      this.snackbarService.openSnack("User successfully deleted")
    }
  }
}
