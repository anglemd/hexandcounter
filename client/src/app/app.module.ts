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
import { CanvasComponent } from './components/canvas/canvas.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GameComponent } from './components/game/game.component';
import { GameInfoComponent } from './components/toolbar/game-info/game-info.component';
import { UserInfoComponent } from './components/toolbar/user-info/user-info.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UnitDesignerComponent } from './components/design/unit-designer/unit-designer.component';
import { EditUnitModalComponent } from './components/design/edit-unit-modal/edit-unit-modal.component';

const config: SocketIoConfig = {
  url: 'ws://' + document.location.host, // use "wss://" if hosted on https....
  options: {
    transports: ['websocket'],
    path: '/wsapi/socket.io',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    MainComponent,
    GameListComponent,
    CanvasComponent,
    ToolbarComponent,
    GameComponent,
    GameInfoComponent,
    UserInfoComponent,
    UnitDesignerComponent,
    EditUnitModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
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
