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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: reducer 
    } as ActionReducerMap<any,any>),
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
