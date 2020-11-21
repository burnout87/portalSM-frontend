import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileItem } from 'ng2-file-upload';

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
    var fileImg: any = $event.target.files[0];
    fileImg.loading = true;
    var bar = new Promise((resolve, reject) => {
      this.files.push(fileImg);
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        fileImg.imageURL = reader.result as string;
        resolve();
      }
      reader.readAsDataURL(fileImg);
    });
    bar.then(() =>  {
      fileImg.loading = false;
      $event.target.value = null;
      this.onChange(this.files);
    });
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
