import { Component, OnInit } from '@angular/core';
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

  private file: File | null = null;
  public files: Array<File> = new Array();;
  onChange: Function;

  constructor() { }

  writeValue(obj: any): void {
    
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

  ngOnInit(): void {
  }

   onFileChange($event) {
     console.log($event);
     this.file = $event.target.files[0];
     this.files.push($event.target.files[0]);
     this.onChange(this.files);
   }

}
