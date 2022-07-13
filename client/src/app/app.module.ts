import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './modules/material.module';
import { AuthGuardService } from './guards/auth-guard';
import { AuthHttpInterceptor } from './interceptors/auth-http-interceptor';
import { MainComponent } from './components/main/main.component';
import { GameListComponent } from './components/game-list/game-list.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ConfirmDialogComponent, MainComponent, GameListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    // USE A CUSTOM INTERCEPTOR TO ADD JWT TOKEN TO EACH HTTP HEADER...
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    // MAKE SURE WE ARE LOGGED IN...
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
