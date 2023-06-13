import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app.state.model';
import { UpdateUserAction } from 'src/app/store/actions/users.action';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    phone: new FormControl('',[Validators.required]),
    website: new FormControl('',[Validators.required, Validators.minLength(4)]),
    address: new FormGroup({
      street: new FormControl('',[Validators.required, Validators.minLength(4)]),
      city: new FormControl('',[Validators.required, Validators.minLength(4)]),
      zipcode: new FormControl('',[Validators.required, Validators.minLength(4)]),
      suite: new FormControl('',[Validators.required])
    }),
    company: new FormGroup({
      name: new FormControl('',[Validators.required]),
      bs: new FormControl('',[Validators.required, Validators.minLength(4)])
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

  fillForm = (): void => {
    this.profileForm.patchValue(this.data.user);
  }

  enableEdit = (): void => {
    this.editEnabled = !this.editEnabled
    return this.editEnabled ? this.profileForm.enable() : this.profileForm.disable()
  }

  onSubmit = () => {
    this.data.isNew ? this.saveUser() : this.updateUsersList()

  }

  saveUser = () => {
    const randomId =  Math.floor(Math.random() * 6) + 10
    let newUser = this.profileForm.value as User;
    newUser.id = randomId.toString()
    newUser.username = newUser.name.substring(0, 3).trim()
    let userList = this.users.slice();
    userList.push(newUser)
    this.store.dispatch(new UpdateUserAction(userList))
    this.dialogRef.close()
    this.snackbarService.openSnack("New user successfully saved")

  }

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

  shouldDisable = (): boolean => {
    const errors: any = []
    Object.keys(this.profileForm.controls).forEach(key => {
      const controlErrors =  this.profileForm.get(key)!.errors;
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
