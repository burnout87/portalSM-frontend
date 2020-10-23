import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MachineFormComponent } from "./machine-form/machine-form.component";
import { ConnectivityService } from "./connectivity.service";
import { HttpClientModule } from "@angular/common/http";
import { MachineComponent } from './machine/machine.component';
import { MaterialModule } from './material.modules';
import { ListMachineComponent } from './list-machine/list-machine.component';
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  declarations: [AppComponent, MachineFormComponent, MachineComponent, ListMachineComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, FileUploadModule, MaterialModule, HttpClientModule],
  providers: [ConnectivityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
