import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMachineComponent } from './list-machine/list-machine.component';
import { LoginComponent } from './login/login.component';
import { MachineFormComponent } from './machine-form/machine-form.component';


const routes: Routes = [
{
  path: '',
  component: ListMachineComponent
},
{
  path: 'addsm',
  component: MachineFormComponent
},
// {
//   path: 'listsms',
//   component: ListMachineComponent
// },
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
