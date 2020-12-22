import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MachineFormComponent } from "./machine-form/machine-form.component";
import { ConnectivityService } from "./connectivity.service";
import { HttpClientModule } from "@angular/common/http";
import { MachineComponent } from './machine/machine.component';
import { MaterialModule } from './material.modules';
import { ListMachineComponent } from './list-machine/list-machine.component';
import { FileUploadModule } from "ng2-file-upload";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule  } from 'ngx-useful-swiper';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwerSearchComponent } from './ower-search/ower-search.component';
import { SearchMachineComponent } from './search-machine/search-machine.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [AppComponent, MachineFormComponent, MachineComponent, ListMachineComponent, FileUploadComponent, LoginComponent, OwnerFormComponent, OwerSearchComponent, SearchMachineComponent],
  imports: [BrowserModule, GalleryModule.forRoot(), BrowserAnimationsModule, NgxUsefulSwiperModule, CommonModule, ReactiveFormsModule, FormsModule, AppRoutingModule, FileUploadModule, MaterialModule, HttpClientModule, ColorPickerModule],
  providers: [ConnectivityService],
  bootstrap: [AppComponent],
})
export class AppModule {}
