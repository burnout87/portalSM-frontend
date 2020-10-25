import { Component, HostListener, OnInit } from "@angular/core";
import { MachineType } from "../machine";
import { ConnectivityService } from "../connectivity.service";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"]
})
export class MachineFormComponent implements OnInit {
  
  newMachine;
  types = Object.keys(MachineType);
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  // machine = new Machine();
  response: string;
  submitted = false;
  private file: File | null = null;

  constructor(private csService: ConnectivityService,
          private formBuilder: FormBuilder) {
      this.newMachine = this.formBuilder.group({
        name: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        year: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
      });
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'image',
    });
    this.uploader.response.subscribe( res => this.response = res );
    this.hasBaseDropZoneOver = false;
    this.response = '';
  }

  // @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
  //   const file = event && event.item(0);
  //   this.file = file;
  // }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };

  }

  onSubmit(machineData) {
    this.csService.InsertNewMachine(this.toFormData(machineData)).subscribe((data) => {
      console.log(data);
    });
    this.submitted = true;
  }

  private toFormData<T>(data:T) {
    const formData = new FormData();

    for ( const key of Object.keys(data) ) {

      if(key == 'image') {
        data[key].forEach(element => {
          formData.append(key, element);  
        });
      }

      const value = data[key];
      formData.append(key, value);
    }

    return formData;
  }

  showFormControls(form: any) {
    return form && form.controls["name"] && form.controls["name"].value;
  }

  // onFileChange(event) {
  //   console.log(event);
    // const reader = new FileReader();
    
    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    
    //   reader.onload = () => {
   
    //     this.imageSrc = reader.result as string;
     
    //     this.myForm.patchValue({
    //       fileSource: reader.result
    //     });
   
    //   };
   
    // }
  // }

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }
}
