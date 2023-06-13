import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/users.reducer';
import { MatTableModule } from '@angular/material/table'
import { SearchbarComponent } from './components/utils/searchbar/searchbar.component'
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './components/utils/toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/utils/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailsComponent } from './components/user-dialog/user-details.component';
import { DialogHandlerComponent } from './components/utils/dialog-handler/dialog-handler.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snackbar.service';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { ErrorInterceptorService } from './services/interceptor.service';
import { ConfigErrorComponent } from './components/config-error/config-error.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchbarComponent,
    ToolbarComponent,
    HeaderComponent,
    UserDetailsComponent,
    DialogHandlerComponent,
    UserDeleteComponent,
    ConfigErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      dataState: reducer
    } as ActionReducerMap<any, any>),
    BrowserAnimationsModule
  ],
  providers: [
    DashboardService,
    SnackbarService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [ConfigService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Used to load the config.json file before the rest of the app loads.
export function loadConfig(appConfigService: ConfigService) {
  return () => {
    return appConfigService.load()
  };
}
