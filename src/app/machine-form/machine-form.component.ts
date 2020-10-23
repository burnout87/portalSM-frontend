import { Component, OnInit } from "@angular/core";
import { Machine, MachineType } from "../machine";
import { ConnectivityService } from "../connectivity.service";
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: "app-machine-form",
  templateUrl: "./machine-form.component.html",
  styleUrls: ["./machine-form.component.css"],
})
export class MachineFormComponent implements OnInit {
  constructor(private csService: ConnectivityService) {
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'photo',
    });
    this.uploader.response.subscribe( res => this.response = res );
    this.hasBaseDropZoneOver = false;
    this.response = '';
  }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

  types = Object.keys(MachineType);
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  machine = new Machine();
  response: string;
  submitted = false;

  onSubmit() {
    var newMachine: Machine = new Machine(
      this.machine.id,
      this.machine.name,
      this.machine.type,
      this.machine.year
    );
    this.csService.InsertNewMachine(newMachine).subscribe((data) => {
      console.log(data);
    });
    this.submitted = true;
  }

  showFormControls(form: any) {
    return form && form.controls["name"] && form.controls["name"].value;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
