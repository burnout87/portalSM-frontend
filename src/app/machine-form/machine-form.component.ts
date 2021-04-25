import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Router } from "@angular/router"
import { ConnectivityService } from "../connectivity.service";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { OwnerFormComponent } from '../owner-form/owner-form.component';
import { ActivationType, ContainerType, Machine } from "../machine";
import * as uuid from 'uuid';

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"]
})
export class MachineFormComponent implements OnInit {
  
  inputMachine: any = null;
  newMachine: FormGroup;
  ownerData: FormGroup;
  updatedMachine: boolean = true;
  progress = -1;
  initValueActivationType: any;
  initValueContainerType: any;
  activationTypes = Object.values(ActivationType);
  containerTypes = Object.values(ContainerType);
  @ViewChild(FormGroupDirective) myForm;
  @ViewChild(OwnerFormComponent) private ownerForm: OwnerFormComponent;

  constructor(private csService: ConnectivityService,
          private formBuilder: FormBuilder,
          private router: Router) {
      this.inputMachine = this.router.getCurrentNavigation().extras.state as any;
      this.newMachine = this.formBuilder.group({
        name: new FormControl(this.inputMachine?.name),
        year: new FormControl(this.inputMachine?.year),
        activationType: new FormControl(null),
        containerType: new FormControl(null),
        serialNumber: new FormControl(this.inputMachine?.serialNumber),
        brand:  new FormControl(this.inputMachine?.brand),
        images: new FormControl(this.inputMachine?.images),
        description: new FormControl(this.inputMachine?.description),
        color: new FormControl(this.inputMachine?.color),
        variation: new FormControl(this.inputMachine?.variation),
        ownerData: this.formBuilder.group({
          name: new FormControl(this.inputMachine?.ownerData?.name),
          surname: new FormControl(this.inputMachine?.ownerData?.surname),
          address: new FormControl(this.inputMachine?.ownerData?.address),
          cap: new FormControl(this.inputMachine?.ownerData?.cap),
          city: new FormControl(this.inputMachine?.ownerData?.city),
          country: new FormControl(this.inputMachine?.ownerData?.country),
          phone: new FormControl(this.inputMachine?.ownerData?.phone),
          mail: new FormControl(this.inputMachine?.ownerData?.mail),
          _id: new FormControl(this.inputMachine?.ownerData?._id),
        }),
      });
      this.initValueActivationType = this.inputMachine?.activationType ? this.inputMachine?.activationType : "empty";
      this.initValueContainerType = this.inputMachine?.containerType ? this.inputMachine?.containerType : "empty";
  }

  ngOnInit(): void {
  }

  updateOwnerData(ownerForm: FormGroup) {
    this.ownerData = ownerForm;
    if(ownerForm)
      this.newMachine.patchValue({ownerData: this.ownerData.value});
    else
      this.newMachine.patchValue({ownerData: this.ownerData.value});
  }

  onSubmit() {

    if(this.inputMachine) {
      // update operation
      // adding record creation date
      let fdNewMachine:FormData = this.toFormData(this.newMachine.value);
      // fdNewMachine.append('recordingTime', this.inputMachine.recordingTime);
      fdNewMachine.append('lastUpdateTime', new Date().getTime().toString());
      fdNewMachine.append('id', this.inputMachine._id);
      this.csService.UpdateCard(fdNewMachine).subscribe((event) => {
        if (event.type && event.type === HttpEventType.UploadProgress ) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
  
        if (event.type && event.type === HttpEventType.Response ) {
          if(event.body && event.body.success == true) {
            this.newMachine.reset();
            this.myForm.resetForm();
            this.ownerForm.resetForm();
            this.progress = -1;
            this.inputMachine = null;
          }
        }
      });
    } else {
      // adding record creation date
      let fdNewMachine:FormData = this.toFormData(this.newMachine.value);
      fdNewMachine.append('recordingTime', new Date().getTime().toString());
      this.csService.InsertNewMachine(fdNewMachine).subscribe((event) => {
        if (event.type && event.type === HttpEventType.UploadProgress ) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
        if (event.type && event.type === HttpEventType.Response ) {
          if(event.body && event.body.success == true) {
            this.newMachine.reset();
            this.myForm.resetForm();
            this.ownerForm.resetForm();
            this.progress = -1;
          }
        }
      });
    }
  }

  private toFormData<T>(data:T) {
    const formData = new FormData();

    for ( const key of Object.keys(data) ) {
      if(data[key] != null) {
        if(typeof(data[key]) == 'object') {
          if(key == 'images') {
            data[key]?.forEach(element => {
              formData.append(key, element);
            });
          } 
          else if(key == 'ownerData') {
            // formData.append('ownerData', JSON.stringify(data[key]));
            for ( const ownerKey of Object.keys(data[key]) ) {
              if(data[key][ownerKey] != null)
                formData.append(`ownerData[${ownerKey}]`, data[key][ownerKey]);
            }
          }
          
        }
        // if(typeof(data[key]) == 'number') {
        //   const value: number = data[key];
        //   formData.append(key, value);
        // }
        else {
          const value = data[key];
          formData.append(key, value);
        }
      }
    }

    return formData;
  }

}
