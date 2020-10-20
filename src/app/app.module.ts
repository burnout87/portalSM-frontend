import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MachineFormComponent } from "./machine-form/machine-form.component";
import { ConnectivityService } from "./connectivity.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, MachineFormComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [ConnectivityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
