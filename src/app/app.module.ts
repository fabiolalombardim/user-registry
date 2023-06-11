import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { DashboardService } from './services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDetailComponent,
    SearchbarComponent,
    ToolbarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule,
    StoreModule.forRoot({
      dataState: reducer
    } as ActionReducerMap<any, any>),
    BrowserAnimationsModule
  ],
  providers: [DashboardService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      multi: true,
      deps: [ConfigService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function loadConfig(appConfigService: ConfigService) {
  return () => {
    return appConfigService.load()
  };
}
