import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitDesignerComponent } from './components/design/unit-designer/unit-designer.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuardService } from './guards/auth-guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'game/:id',
    component: GameComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'game-list',
    component: GameListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'unit-designer',
    component: UnitDesignerComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '/main' }, // REDIRECT ANY OTHER ROUTES TO SEARCH...
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
