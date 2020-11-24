import { Component, OnInit, ViewChild } from "@angular/core";
import { MachineType } from "../machine";
import { ConnectivityService } from "../connectivity.service";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"]
})
export class MachineFormComponent implements OnInit {
  
  newMachine:FormGroup;
  ownerData: FormGroup;
  progress = -1;
  types = Object.keys(MachineType);
  @ViewChild(FormGroupDirective) myForm;

  constructor(private csService: ConnectivityService,
          private formBuilder: FormBuilder) {
      this.newMachine = this.formBuilder.group({
        name: new FormControl(null),
        type: new FormControl(null),
        year: new FormControl(null),
        images: new FormControl(null),
        description: new FormControl(null),
        color: new FormControl(null),
        variation: new FormControl(null),
        pedal: new FormControl(null),
        handle: new FormControl(null),
        engine: new FormControl(null),
        typeBox: new FormControl(null),
        ownerData: this.formBuilder.group({
          name: new FormControl(null),
          surname: new FormControl(null),
          address: new FormControl(null),
          cap: new FormControl(null),
          city: new FormControl(null),
          country: new FormControl(null),
          phone: new FormControl(null),
          mail: new FormControl(null),
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
        else {
          const value = data[key];
          formData.append(key, value);
        }
      }
    }

    return formData;
  }

}
