import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {ProblemeComponent} from './probleme/probleme.component';

const routes: Routes = [
  {path:'accueil',component:AccueilComponent},
  {path:'', redirectTo:'accueil',pathMatch:'full'},
  {path:'**', redirectTo:'Accueil',pathMatch:'full'}, //if the route doesn't exist redirects automatically the user to "Accueil"
  {path:'probleme',component:ProblemeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
