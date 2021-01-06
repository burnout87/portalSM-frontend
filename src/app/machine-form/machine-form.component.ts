import { Component, OnInit, ViewChild } from "@angular/core";
import { ConnectivityService } from "../connectivity.service";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { OwnerFormComponent } from '../owner-form/owner-form.component';
import { ActivationType, ContainerType } from "../machine";

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"]
})
export class MachineFormComponent implements OnInit {
  
  newMachine:FormGroup;
  ownerData: FormGroup;
  progress = -1;
  activationTypes = Object.values(ActivationType);
  containerTypes = Object.values(ContainerType);
  @ViewChild(FormGroupDirective) myForm;
  @ViewChild(OwnerFormComponent) private ownerForm: OwnerFormComponent;

  constructor(private csService: ConnectivityService,
          private formBuilder: FormBuilder) {
      this.newMachine = this.formBuilder.group({
        name: new FormControl(null),
        year: new FormControl(null),
        activationType: new FormControl(null),
        containerType: new FormControl(null),
        serialNumber: new FormControl(null),
        brand:  new FormControl(null),
        images: new FormControl(null),
        description: new FormControl(null),
        color: new FormControl(null),
        variation: new FormControl(null),
        ownerData: this.formBuilder.group({
          name: new FormControl(null),
          surname: new FormControl(null),
          address: new FormControl(null),
          cap: new FormControl(null),
          city: new FormControl(null),
          country: new FormControl(null),
          phone: new FormControl(null),
          mail: new FormControl(null),
          _id: new FormControl(null),
        }),
      });
  }

  ngOnInit(): void {
  }

  updateOwnerData(ownerForm: FormGroup) {
    this.ownerData = ownerForm;
    this.newMachine.patchValue({ownerData: this.ownerData.value});
  }

  onSubmit() {
    // adding record creation date
    var fdNewMachine:FormData = this.toFormData(this.newMachine.value);
    fdNewMachine.append('recordingTime', new Date().getTime().toString())
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
