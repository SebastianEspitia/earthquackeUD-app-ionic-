import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from "./pages/indexPages";
import { CreateUserComponent } from "./pages/indexPages";
import { TodosSismosComponent } from "./pages/indexPages";
import { PagesMapsEarthquakeComponent } from "./pages/indexPages";
import { PopoverPageMapsEarthquakeComponent } from "./pages/indexPages";
import { ComoActuarComponent } from "./pages/indexPages";
import { RecuperarConstrasenaComponent } from "./pages/indexPages";

const routes: Routes = [
  {
    path: 'login-user',
    component: LoginUserComponent
  },
  {
    path: '',
    redirectTo: 'login-user',
    pathMatch: 'full'
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'todos-sismos',
    component: TodosSismosComponent
  },
  {
    path: 'popover/:sismo',
    component: PopoverPageMapsEarthquakeComponent
  },
  {
    path: 'pages-maps-earthquake',
    component: PagesMapsEarthquakeComponent
  },
  {
    path: 'como-actauar',
    component: ComoActuarComponent
  },
  {
    path: 'recuperar-constrasena',
    component: RecuperarConstrasenaComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
