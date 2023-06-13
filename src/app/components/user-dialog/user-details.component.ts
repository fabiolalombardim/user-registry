import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app.state.model';
import { UpdateUserAction } from 'src/app/store/actions/users.action';
import { SnackbarService } from 'src/app/services/snackbar.service';

// Component used for two functionalities: Show the details of an user or create a new user.
// It is made up of a form that, depending on whether it is an "update", fills in the form fields with the user's information received. 
// Otherwise, the form is enabled and allows the creation of a new user. 
// For an update, the fields can be enabled as well if the user clicks the button "Edit". Initially, it is always disabled
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User, isNew: boolean },
    private readonly snackbarService: SnackbarService,
    private store: Store<AppState>, public dialogRef: MatDialogRef<UserDetailsComponent>
  ) { }

  editEnabled = false;

  users!: User[]

  profileForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    id: new FormControl('1'),
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required, Validators.minLength(4)]),
      city: new FormControl('', [Validators.required, Validators.minLength(4)]),
      zipcode: new FormControl('', [Validators.required, Validators.minLength(4)]),
      suite: new FormControl('', [Validators.required])
    }),
    company: new FormGroup({
      name: new FormControl('', [Validators.required]),
      bs: new FormControl('', [Validators.required, Validators.minLength(4)])
    })

  });

  async ngOnInit(): Promise<void> {
    this.store.select('dataState').forEach(values => {
      this.users = values.users
    })

    if (this.data && this.data.user) {
      this.fillForm()
      this.profileForm.disable()
    } else {
      this.profileForm.enable()
    }
  }

  // Method in charge of filling the form with the user's data
  fillForm = (): void => {
    this.profileForm.patchValue(this.data.user);
  }

  // Method in charge of allowing/disallowing the modification of the fields by enabling or disabling
  // the form.
  enableEdit = (): void => {
    this.editEnabled = !this.editEnabled
    return this.editEnabled ? this.profileForm.enable() : this.profileForm.disable()
  }

  // Depending if the variable isNew is true or false, this methods calls the corresponding
  // method to save/update the information
  onSubmit = () => {
    this.data.isNew ? this.saveUser() : this.updateUsersList()

  }

  // This method creates a new user and attaches it to the list of existing users.
  // Then, the new list gets saved in the store.
  saveUser = () => {
    const randomId = Math.floor(Math.random() * 6) + 10 // to generate random Id
    let newUser = this.profileForm.value as User;
    newUser.id = randomId.toString()
    newUser.username = newUser.name.substring(0, 3).trim() // just to field this parameter with some value
    let userList = this.users.slice();
    userList.push(newUser)
    this.store.dispatch(new UpdateUserAction(userList))
    this.dialogRef.close()
    this.snackbarService.openSnack("New user successfully saved")

  }

  // This method updates the list of existing users.
  // First, it deletes the old version of the user received.
  // Then, it introduces the new version of the user (the modified one) in the exact same position it was
  // in the list, so that the change of object won't be visible for the user in the table.
  // Then the list with the new (old but updated) user gets saved in the store.
  updateUsersList = () => {
    let updatedUser = this.profileForm.value as User;
    const id = this.data.user.id;
    const index = this.users.findIndex(obj => obj.id === id);

    let userList = this.users.slice();
    if (index > -1) { // only splice array when item is found
      userList.splice(index, 1); // 2nd parameter means remove one item only
      userList.splice(index, 0, updatedUser); // 2nd parameter adds on the same index the new updated object

      this.store.dispatch(new UpdateUserAction(userList))
      this.dialogRef.close()
      this.snackbarService.openSnack("User successfully updated")
    }
  }

  // Method that controls if there is any error in any of the fields of the form.
  // If they are, it will return true, and the "Save" button from the modal will be disabled.
  shouldDisable = (): boolean => {
    const errors: any = []
    Object.keys(this.profileForm.controls).forEach(key => {
      const controlErrors = this.profileForm.get(key)!.errors;
      if (controlErrors !== null) {
        errors.push(controlErrors)
      }
    });
    if (errors.length > 0) {
      return true
    }
    return false
  }
}
