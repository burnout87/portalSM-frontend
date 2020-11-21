import { Component, OnInit } from "@angular/core";
import { MachineType } from "../machine";
import { ConnectivityService } from "../connectivity.service";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"]
})
export class MachineFormComponent implements OnInit {
  
  newMachine:FormGroup;
  progress = -1;
  types = Object.keys(MachineType);

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
      });
  }

  ngOnInit(): void {
  }

  onSubmit(machineData) {
    // adding record creation date
    machineData.recordingTime = new Date().getTime();
    this.csService.InsertNewMachine(this.toFormData(machineData)).subscribe((event) => {
    
      if (event.type && event.type === HttpEventType.UploadProgress ) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }

      if (event.type && event.type === HttpEventType.Response ) {
        console.log(event.body);
        this.newMachine.reset();
        this.progress = -1;
      }
      
    });
  }

  private toFormData<T>(data:T) {
    const formData = new FormData();

    for ( const key of Object.keys(data) ) {

      if(typeof(data[key]) == 'object' && key == 'images') {
        data[key]?.forEach(element => {
          formData.append(key, element);  
        });
      }
      else {
        const value = data[key];
        formData.append(key, value);
      }
    }

    return formData;
  }

}
