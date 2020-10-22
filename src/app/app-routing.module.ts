import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMachineComponent } from './list-machine/list-machine.component';
import { MachineFormComponent } from './machine-form/machine-form.component';


const routes: Routes = [
{
  path: 'addsm',
  component: MachineFormComponent
},
{
  path: 'listsms',
  component: ListMachineComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
