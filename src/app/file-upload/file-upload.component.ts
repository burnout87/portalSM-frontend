import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor  {

  public files: Array<File> = new Array();
  onChange: Function;
  @Input() progress;

  constructor() { }

  writeValue(obj: any): void { 
    this.cleanFilesList();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void { }

  onFileChange($event) {
    this.files.push($event.target.files[0]);
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      $event.target.files[0].imageURL = reader.result as string;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.onChange(this.files);
  }

  cleanFilesList() {
    this.files = new Array();
  }

   removeFileFromList(file) {
    const index = this.files.indexOf(file, 0);
    if(index > -1)
     this.files.splice(index, 1);
   }
}
